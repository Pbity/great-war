#!/usr/bin/env python3
"""
Secret Hitler QR — Lokalny serwer Wi-Fi (Offline LAN)
Wymaga tylko standardowego Pythona 3 (zero dodatkowych bibliotek).
Użycie:
  python server.py           (HTTP na porcie 8000)
  python server.py --https   (generuje lokalny certyfikat przez openssl i uruchamia HTTPS na porcie 8443)
"""

import http.server
import json
import os
import socket
import ssl
import subprocess
import sys

GAME_STATE = {}
PENDING_ACTIONS = []


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip


class SecretHitlerHandler(http.server.SimpleHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        global GAME_STATE, PENDING_ACTIONS
        path = self.path.split("?")[0]
        if path == "/api/ping":
            proto = "https" if USE_HTTPS else "http"
            self._send_json({"ok": True, "url": f"{proto}://{LOCAL_IP}:{PORT}"})
            return
        if path == "/api/state":
            self._send_json(GAME_STATE)
            return
        if path == "/api/actions":
            actions = list(PENDING_ACTIONS)
            PENDING_ACTIONS.clear()
            self._send_json({"actions": actions})
            return
        super().do_GET()

    def do_POST(self):
        global GAME_STATE, PENDING_ACTIONS
        path = self.path.split("?")[0]
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            self._send_json({"ok": False, "error": "Invalid JSON"}, 400)
            return

        if path == "/api/state":
            GAME_STATE = data
            self._send_json({"ok": True})
            return
        if path == "/api/action":
            PENDING_ACTIONS.append(data)
            self._send_json({"ok": True})
            return
        self._send_json({"ok": False}, 404)

    def log_message(self, format, *args):
        pass


def ensure_cert():
    cert_file = "cert.pem"
    key_file = "key.pem"
    if os.path.exists(cert_file) and os.path.exists(key_file):
        return cert_file, key_file
    print("Generowanie lokalnego certyfikatu HTTPS (openssl)...")
    try:
        subprocess.run(
            [
                "openssl", "req", "-x509", "-newkey", "rsa:2048",
                "-keyout", key_file, "-out", cert_file,
                "-days", "30", "-nodes",
                "-subj", f"/CN={LOCAL_IP}"
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        return cert_file, key_file
    except Exception:
        print("UWAGA: Nie znaleziono openssl. Uruchamiam zwykły tryb HTTP (użyj natywnego aparatu telefonu do skanowania QR).")
        return None, None


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    USE_HTTPS = "--https" in sys.argv
    LOCAL_IP = get_local_ip()
    PORT = 8443 if USE_HTTPS else 8000

    httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), SecretHitlerHandler)

    if USE_HTTPS:
        cert, key = ensure_cert()
        if cert and key:
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain(certfile=cert, keyfile=key)
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        else:
            USE_HTTPS = False
            PORT = 8000
            httpd.server_close()
            httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), SecretHitlerHandler)

    proto = "https" if USE_HTTPS else "http"
    print("============================================================")
    print("  SECRET HITLER — SERWER LAN URUCHOMIONY")
    print(f"  Na laptopie otwórz:   {proto}://localhost:{PORT}")
    print(f"  Na telefonach otwórz: {proto}://{LOCAL_IP}:{PORT}")
    print("  Zatrzymanie serwera:  Ctrl+C")
    print("============================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nSerwer zatrzymany.")
