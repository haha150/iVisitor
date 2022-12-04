from contextlib import contextmanager
from ldap3 import Server, Connection, ALL, ALL_ATTRIBUTES


class CustomLDAP:
    def __init__(self):
        self.server = Server('', get_info=ALL)
        self.username = ''
        self.password = ''
        self.base = ''

    @contextmanager
    def get_connection(self, username, password):
        conn = Connection(self.server, user=username, password=password, port=636, use_ssl=True,
                          version=3, auto_bind=True, read_only=True, auto_referrals=False)
        #conn.start_tls()
        yield conn
        conn.unbind()

    def authenticate(self, username, password):
        user = f''
        with self.get_connection(user, password):
            pass

    def search_user(self, usr):
        with self.get_connection(self.username, self.password) as conn:
            conn.search(self.base,
                        '(&(objectClass=user)\
                        (|(displayName=' + usr + '*)\
                                (cn=' + usr + '*)))',
                        attributes=ALL_ATTRIBUTES, time_limit=50)

            if conn.entries:
                return conn.entries
            return None

    def search_group(self, group):
        with self.get_connection(self.username, self.password) as conn:
            conn.search(self.base,
                        '(&(objectClass=group)\
                        (objectClass=top)\
                        (|(displayName=' + group + '*)(cn=' + group + '*)))',
                        attributes=ALL_ATTRIBUTES, time_limit=50)

            if conn.entries:
                return conn.entries
            return None
