FROM httpd:2.4

COPY ./disenio.conf /usr/local/apache2/conf/httpd.conf

COPY .htaccess /usr/local/apache2/htdocs

COPY ./dist /usr/local/apache2/htdocs



