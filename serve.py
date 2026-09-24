import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Désactiver le cache en local : sans cela le navigateur peut servir
        # d'anciens CSS/JS et faire croire qu'une modification n'a pas pris.
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # silence logs

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    httpd.serve_forever()
