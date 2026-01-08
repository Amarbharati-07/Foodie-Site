import http.server
import socketserver
import os

PORT = 5000
# Since we moved everything to the root of Foodie-Site/Foodie-Site
DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + "/Foodie-Site/Foodie-Site"

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Translate the path relative to DIRECTORY
        path = self.translate_path(self.path)
        # If the path doesn't exist (and isn't a directory request that should have /index.html)
        # serve index.html for React routing
        if not os.path.exists(path):
            self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    print(f"Serving SPA from {DIRECTORY} on port {PORT}")
    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        httpd.serve_forever()
