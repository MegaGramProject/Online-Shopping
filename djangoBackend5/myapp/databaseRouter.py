class DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'use-default':
            return 'default'
        return 'psql'

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'use-default':
            return 'default'
        return 'psql'

