"""
WSGI config for portfolio_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os
import sys

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
        # First run migrate to create all tables
        call_command('migrate', interactive=False, verbosity=1)
    except Exception as e:
        print(f"[Vercel] Error running migrate: {e}", file=sys.stderr)
        # Fallback: try syncdb only
        try:
            call_command('migrate', '--run-syncdb', interactive=False, verbosity=1)
        except Exception as e2:
            print(f"[Vercel] Error running syncdb fallback: {e2}", file=sys.stderr)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
app = application
