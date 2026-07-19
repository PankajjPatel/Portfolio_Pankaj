"""
WSGI config for portfolio_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

# Run migrations BEFORE app loads on Vercel (in-memory SQLite needs tables on every cold start)
if os.environ.get('VERCEL') == '1':
    import django
    django.setup()
    from django.core.management import call_command
    try:
        call_command('migrate', '--run-syncdb', interactive=False, verbosity=0)
    except Exception as e:
        import sys
        print(f"Error running migrations on Vercel startup: {e}", file=sys.stderr)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
app = application
