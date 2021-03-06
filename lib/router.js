// Generated by CoffeeScript 1.4.0
(function() {
  var Router;

  Router = function(options) {
    var default_options, dispatch, domain, escaped_icon, fs, http, mime_types, net, path_tools, querystring, spawn, urlparse, _bodyparser, _dirlist_template, _extend, _make_request_wrapper, _multipartparser, _parsePattern, _pushRoute;
    if (options == null) {
      options = {};
    }
    urlparse = require('url').parse;
    querystring = require('querystring');
    fs = require('fs');
    path_tools = require('path');
    spawn = require('child_process').spawn;
    domain = require('domain');
    net = require('net');
    http = require('http');
    mime_types = {
      '': 'application/octet-stream',
      '.bin': 'application/octet-stream',
      '.com': 'application/x-msdownload',
      '.exe': 'application/x-msdownload',
      '.htm': 'text/html',
      '.html': 'text/html',
      '.txt': 'text/plain',
      '.css': 'text/css',
      '.mid': 'audio/midi',
      '.midi': 'audio/midi',
      '.wav': 'audio/x-wav',
      '.mp3': 'audio/mpeg',
      '.ogg': 'audio/ogg',
      '.mp4': 'video/mp4',
      '.mpeg': 'video/mpeg',
      '.avi': 'video/x-msvideo',
      '.pct': 'image/pict',
      '.pic': 'image/pict',
      '.pict': 'image/pict',
      '.ico': 'image/x-icon',
      '.jpg': 'image/jpg',
      '.jpeg': 'image/jpg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.pcx': 'image/x-pcx',
      '.tiff': 'image/tiff',
      '.svg': 'image/svg+xml',
      '.xul': 'text/xul',
      '.rtf': 'application/rtf',
      '.xls': 'application/vnd.ms-excel',
      '.xml': 'application/xml',
      '.doc': 'application/msword',
      '.pdf': 'application/pdf',
      '.mobi': 'application/x-mobipocket-ebook',
      '.epub': 'application/epub+zip',
      '.js': 'application/x-javascript',
      '.json': 'application/json',
      '.sh': 'text/x-sh',
      '.py': 'text/x-python',
      '.rb': 'text/x-ruby',
      '.c': 'text/x-csrc',
      '.cpp': 'text/x-c++src'
    };
    default_options = {
      version: '0.4.7',
      logging: true,
      log: console.log,
      static_route: "" + (process.cwd()) + "/public",
      serve_static: true,
      list_dir: true,
      default_home: ['index.html', 'index.htm', 'default.htm'],
      cgi_dir: "cgi-bin",
      serve_cgi: true,
      serve_php: true,
      php_cgi: "php-cgi",
      served_by: 'Node Simple Router',
      software_name: 'node-simple-router',
      admin_user: 'admin',
      admin_pwd: 'admin'
    };
    escaped_icon = '%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%01fIDATX%85%EDWQ%AE%C4%20%08%1C%5E%F6%28%3D%28%07%ED%5D%D8%8F%D6%16%15%14l%93%FDy%93l%B2%A9%8A%E3%08C%0B%FC%E3%C7%A0%F2G%00Q%0F%C9%9E%DE%80E%E6sh%18k%8D@%B3%B1%F0%3D%9D%B8%E5%E4%84%E2c%E0%CF%1A%D3df%9B%F7%E3t%F2/%BF1%3E%DE%80%00%D2%29%D1n%7E%CBk%93b%83%01%D7s%5D%02CL%EE%D5_%D7%135%AF%A0%9C%7Cx%15/%C1%240%C4%EA%E9%B3%04%5C%15X%24T%7EO%09%98%D0%A7%7F%89%C8%90%80%A9B%7B%05%2C%D2%D7%BE%01%9D%80%AA%3A%9EU%81R%E0%26A%29U%C2W%60V%04%13%F5I%29%E8%A6%3A%A7%07%82V%5C%C6%3C%8B%AE%D6%8E%AC%D80%A6T%12%86%7C%E1RD%99%A4%E5%88%19%02%E1%EE%A8WT%A4%FCjI%1BQ%CE%1D%5B%22A+vB%BD%EA%80i%02%1Ao%F6%88%14%81%BC%0A%27%CF%CAAk%F2K%0A%9C%A1M%15%F6%7D%97j%F3%09%96%09%84q%B9%26L%15%D2%04%C81%AF%82m%DB%C8%94%BE%25%B1J%60%8Ah%87%3CUX%22%E0%A9%A0%1A%12%00R%F9Pm%5C%A9%F0%9A%02%A1%96l%20%D6%8E%0DY%DDzd%A2%22%EF%91%0F%A3%B8%90%B5%F7%81%06%D5%87Ir%ED%B3O3%F4%95@%C0%A1%C0%A0%03%02%B8%92%F0R%60%D5%EB%E9x%05ZK%00%06%7D%01Z%7E%83%C5%C9%DE%7C%81%00%00%00%00IEND%AEB%60%82';
    _extend = function(obj_destiny, obj_src) {
      var key, val;
      for (key in obj_src) {
        val = obj_src[key];
        obj_destiny[key] = val;
      }
      return obj_destiny;
    };
    _parsePattern = function(pat) {
      var m, pars, re, retpat, x;
      re = /\/:([A-Za-z0-9_]+)+/g;
      m = pat.match(re);
      if (m) {
        pars = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = m.length; _i < _len; _i++) {
            x = m[_i];
            _results.push(x.slice(2));
          }
          return _results;
        })();
        retpat = pat.replace(re, "/([A-Za-z0-9_\-]+)");
      } else {
        retpat = pat;
        pars = null;
      }
      return {
        pattern: retpat,
        params: pars
      };
    };
    _make_request_wrapper = function(cb) {
      var wrapper;
      wrapper = function(req, res) {
        var body, contentType, mp_index;
        body = [];
        contentType = 'application/x-www-form-urlencoded';
        if (req.headers['content-type']) {
          contentType = req.headers['content-type'];
        }
        mp_index = contentType.indexOf('multipart/form-data');
        if (mp_index !== -1) {
          req.setEncoding('binary');
        }
        req.on('data', function(chunk) {
          return body.push(chunk);
        });
        return req.on('end', function() {
          body = body.join('');
          if (contentType === 'text/plain') {
            body = body.replace('\r\n', '');
          }
          req.post = mp_index === -1 ? _bodyparser(body) : _multipartparser(body, contentType);
          req.body = _extend(req.body, req.post);
          try {
            return cb(req, res);
          } catch (e) {
            return dispatch._500(req, res, req.url, e.toString());
          }
        });
      };
      return wrapper;
    };
    dispatch = function(req, res) {
      var args, full_path, home_page, index, m, method, param, parsed, pathname, route, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      parsed = urlparse(req.url);
      pathname = parsed.pathname;
      if ((pathname.split('/')).length > 2) {
        pathname = pathname.replace(/\/$/, "");
      }
      req.get = parsed.query != null ? querystring.parse(parsed.query) : {};
      req.body = _extend({}, req.get);
      method = req.method.toLowerCase();
      if (dispatch.logging) {
        dispatch.log("" + req.client.remoteAddress + " - [" + (new Date().toLocaleString()) + "] - " + (method.toUpperCase()) + " " + pathname + " - HTTP " + req.httpVersion);
      }
      _ref = dispatch.routes[method];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        route = _ref[_i];
        m = pathname.match(route.pattern);
        if (m !== null) {
          if (route.params) {
            req.params = {};
            args = m.slice(1);
            _ref1 = route.params;
            for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
              param = _ref1[index];
              req.params[param] = args[index];
            }
          }
          return route.handler(req, res);
        }
      }
      if (pathname === "/") {
        _ref2 = dispatch.default_home;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          home_page = _ref2[_k];
          full_path = "" + dispatch.static_route + "/" + home_page;
          try {
            if (fs.existsSync(full_path)) {
              return dispatch["static"]("/" + home_page, req, res);
            }
          } catch (error) {
            if (!!dispatch.logging) {
              dispatch.log(error.toString());
            }
          }
        }
        if (dispatch.list_dir) {
          return dispatch.directory(dispatch.static_route, '.', res);
        } else {
          return dispatch._404(req, res, pathname);
        }
      }
      if (dispatch.serve_static) {
        return dispatch["static"](pathname, req, res);
      } else {
        return dispatch._404(req, res, pathname);
      }
    };
    _extend(default_options, options);
    _extend(dispatch, default_options);
    _dirlist_template = "<!DOCTYPE  html>\n<html>\n  <head>\n      <title>Directory listing for <%= @cwd %></title>\n      <style type=\"text/css\" media=\"screen\">\n\n      </style>\n  </head>\n  <body>\n      <h2>Directory listing for <%= @cwd %></h2>\n      <hr/>\n      <ul id=\"dircontents\">\n        <%= @cwd_contents %>\n      </ul>\n      <hr/>\n      <p><strong>Served by " + dispatch.served_by + " v" + dispatch.version + "</strong></p>\n  </body>\n</html>";
    _pushRoute = function(pattern, callback, method) {
      var params, parsed;
      params = null;
      if (typeof pattern === "string") {
        parsed = _parsePattern(pattern);
        pattern = new RegExp("^" + parsed.pattern + "$");
        params = parsed.params;
      }
      dispatch.routes[method].push({
        pattern: pattern,
        handler: callback,
        params: params
      });
      return dispatch.routes[method].sort(function(it1, it2) {
        return it2.pattern.toString().length > it1.pattern.toString().length;
      });
    };
    _multipartparser = function(body, content_type) {
      var boundary, m, obj, part, parts, resp, _i, _len;
      resp = {
        "multipart-data": []
      };
      boundary = content_type.split(/;\s+/)[1].split('=')[1].trim();
      parts = body.split("--" + boundary);
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        if (part && part.match(/Content-Disposition:/i)) {
          obj = {};
          m = part.match(/Content-Disposition:\s+(.+?);/i);
          if (m) {
            obj.contentDisposition = m[1];
          }
          m = part.match(/name="(.+?)"/i);
          if (m) {
            obj.fieldName = m[1];
          }
          m = part.match(/filename="(.+?)"/i);
          if (m) {
            obj.fileName = m[1];
          }
          m = part.match(/Content-Type:\s+(.+?)\s/i);
          if (m) {
            obj.contentType = m[1];
          } else {
            obj.contentType = 'text/plain';
          }
          m = part.match(/Content-Length:\s+(\d+?)/i);
          if (m) {
            obj.contentLength = m[1];
          }
          m = part.match(/\r\n\r\n/);
          if (m) {
            obj.fileData = part.slice(m.index + 4, -2);
            obj.fileLen = obj.fileData.length;
          }
          resp['multipart-data'].push(obj);
        }
      }
      return resp;
    };
    _bodyparser = function(body) {
      if (body.indexOf('=') !== -1) {
        try {
          return querystring.parse(body);
        } catch (e) {
          if (!!dispatch.logging) {
            dispatch.log(e);
          }
        }
      }
      try {
        return JSON.parse(body);
      } catch (e) {
        if (!!dispatch.logging) {
          dispatch.log(e);
        }
      }
      return body;
    };
    dispatch.routes = {
      get: [],
      post: [],
      put: [],
      "delete": []
    };
    dispatch["static"] = function(pathname, req, res) {
      var full_path;
      full_path = "" + dispatch.static_route + (unescape(pathname));
      return fs.exists(full_path, function(exists) {
        if (exists) {
          if (((pathname.indexOf("" + dispatch.cgi_dir + "/") !== -1) || (pathname.match(/\.php$/))) && (pathname.substr(-1) !== "/") && (dispatch.serve_cgi === true)) {
            try {
              return dispatch.cgi(pathname, req, res);
            } catch (e) {
              if (!!dispatch.logging) {
                dispatch.log(e.toString());
              }
              return dispatch._500(null, res, pathname);
            }
          } else {
            return fs.stat(full_path, function(err, stats) {
              var fd;
              if (err) {
                if (!!dispatch.logging) {
                  dispatch.log(err.toString());
                }
                return dispatch._500(null, res, pathname);
              }
              if (stats) {
                if (stats.isDirectory()) {
                  if (!!dispatch.list_dir) {
                    return dispatch.directory(full_path, pathname, res);
                  }
                  return dispatch._405(null, res, pathname, "Directory listing not allowed");
                }
                if (stats.isFile()) {
                  fd = fs.createReadStream(full_path);
                  res.writeHead(200, {
                    'Content-Type': mime_types[path_tools.extname(full_path)] || 'text/plain'
                  });
                  return fd.pipe(res);
                }
              }
            });
          }
        } else {
          if (unescape(pathname).match(/favicon\.ico$/)) {
            res.writeHead(200, {
              'Content-Type': mime_types[path_tools.extname('favicon.ico')] || 'application/x-icon'
            });
            return res.end(new Buffer(unescape(escaped_icon), 'binary'));
          } else {
            return dispatch._404(null, res, pathname);
          }
        }
      });
    };
    dispatch.getEnv = function(pathname, req, res) {
      var env, key, query_pairs, val, _ref;
      env = {};
      _ref = req.headers;
      for (key in _ref) {
        val = _ref[key];
        env["HTTP_" + (key.toUpperCase().replace('-', '_'))] = req.headers[key];
      }
      query_pairs = (function() {
        var _ref1, _results;
        _ref1 = req.get;
        _results = [];
        for (key in _ref1) {
          val = _ref1[key];
          _results.push("" + key + "=" + val);
        }
        return _results;
      })();
      if (query_pairs.length !== 0) {
        env["QUERY_STRING"] = "" + (query_pairs.join('&'));
      } else {
        env['QUERY_STRING'] = '';
      }
      env['REMOTE_ADDRESS'] = req.connection.remoteAddress;
      env['REQUEST_URI'] = pathname;
      env['GATEWAY_INTERFACE'] = "CGI/1.1";
      env['SERVER_NAME'] = req.headers.host.split(':')[0];
      env['SERVER_ADDRESS'] = env['SERVER_NAME'];
      env['SERVER_SOFTWARE'] = "" + dispatch.software_name + "/" + dispatch.version;
      env['SERVER_PROTOCOL'] = "HTTP/" + req.httpVersion;
      env['SERVER_PORT'] = req.headers.host.split(':')[1] || 80;
      env['REQUEST_METHOD'] = req.method;
      env['SCRIPT_NAME'] = pathname;
      env['SCRIPT_FILENAME'] = "" + dispatch.static_route + (unescape(pathname));
      if (dispatch.serve_php) {
        env['REDIRECT_STATUS'] = '200';
      }
      return env;
    };
    dispatch.cgi = function(pathname, req, res) {
      var body, child, d, data, env, full_path, isPHP, prepareChild, respbuffer, urlobj;
      urlobj = urlparse(req.url);
      respbuffer = '';
      full_path = "" + dispatch.static_route + (unescape(pathname));
      env = dispatch.getEnv(pathname, req, res);
      isPHP = !!pathname.match(/\.php$/);
      prepareChild = function(req_body) {
        var child;
        if (req_body && isPHP) {
          if (!env['QUERY_STRING']) {
            env['QUERY_STRING'] = '';
          }
          env['QUERY_STRING'] += req_body;
        }
        if (isPHP) {
          if (!dispatch.serve_php) {
            dispatch._405(null, res, pathname, "PHP scripts not allowed");
            return null;
          } else {
            if (!!dispatch.logging) {
              dispatch.log("Spawning " + dispatch.php_cgi + " " + full_path);
            }
            child = spawn(dispatch.php_cgi, [full_path], {
              env: env
            });
          }
        } else {
          if (!!dispatch.logging) {
            dispatch.log("Spawning " + full_path);
          }
          child = spawn(full_path, [], {
            env: env
          });
        }
        child.stderr.pipe(process.stderr);
        child.stdout.on('data', function(data) {
          var arrdata, elem, pair, _i, _len, _results;
          arrdata = data.toString().split('\n');
          _results = [];
          for (_i = 0, _len = arrdata.length; _i < _len; _i++) {
            elem = arrdata[_i];
            if (elem.substr(0, 8).toLowerCase() !== "content-") {
              _results.push(respbuffer += elem);
            } else {
              pair = elem.split(/:\s+/);
              try {
                _results.push(res.setHeader(pair[0], pair[1]));
              } catch (e) {
                if (!!dispatch.logging) {
                  _results.push(dispatch.log("Error setting response header: " + e.message));
                } else {
                  _results.push(void 0);
                }
              }
            }
          }
          return _results;
        });
        child.stdout.on('end', function(moredata) {
          try {
            if (!!moredata) {
              respbuffer += moredata;
            }
            return res.end(respbuffer);
          } catch (e) {
            if (!!dispatch.logging) {
              return dispatch.log("Error terminating response: " + e.message);
            }
          }
        });
        return child;
      };
      body = [];
      if (req.method.toLowerCase() === "post") {
        req.on('data', function(chunk) {
          return body.push(chunk);
        });
        req.on('end', function() {
          var child, d, data;
          body = body.join('');
          req.post = _bodyparser(body);
          req.body = _extend(req.body, req.post);
          try {
            data = querystring.stringify(req.body);
            child = prepareChild(data);
            if (!child) {
              return;
            }
            d = domain.create();
            d.add(child.stdin);
            d.on('error', function(err) {
              if (!!dispatch.logging) {
                return dispatch.log("Child process input error (captured by domain): " + err.message);
              }
            });
            return d.run(function() {
              child.stdin.write("" + data + "\n");
              return child.stdin.end();
            });
          } catch (e) {
            if (!!dispatch.logging) {
              return dispatch.log("Child process input error: " + e.message);
            }
          }
        });
      } else {
        try {
          data = querystring.stringify(req.body);
          if (!!dispatch.logging) {
            dispatch.log("Data to be sent: " + data);
          }
          child = prepareChild();
          if (!child) {
            return;
          }
          d = domain.create();
          d.add(child.stdin);
          d.on('error', function(err) {
            if (!!dispatch.logging) {
              return dispatch.log("Child process input error (captured by domain): " + err.message);
            }
          });
          d.run(function() {
            child.stdin.write("" + data + "\n");
            return child.stdin.end();
          });
        } catch (e) {
          if (!!dispatch.logging) {
            dispatch.log("Child process input error: " + e.message);
          }
        }
      }
      return 0;
    };
    dispatch.sendSCGIRequest = function(request, sock) {
      var encPost, key, req, val, _ref;
      if (request.method.toLowerCase() === 'post') {
        encPost = querystring.stringify(request.post);
      } else {
        encPost = "";
      }
      req = "";
      req += "CONTENT_LENGTH\0" + encPost.length + "\0";
      req += "REQUEST_METHOD\0" + request.method + "\0";
      req += "REQUEST_URI\0" + request.url + "\0";
      req += "QUERY_STRING\0" + (querystring.stringify(request.get)) + "\0";
      req += "CONTENT_TYPE\0" + (request.headers['content-type'] || 'text/plain') + "\0";
      req += "DOCUMENT_URI\0" + request.url + "\0";
      req += "DOCUMENT_ROOT\0" + '/' + "\0";
      req += "SCGI\u0000\u0031\u0000";
      req += "SERVER_PROTOCOL\0HTTP/1.1\0";
      req += "REMOTE_ADDR\0" + request.connection.remoteAddress + "\0";
      req += "REMOTE_PORT\0" + request.connection.remotePort + "\0";
      req += "SERVER_PORT\0" + (request.headers['host'].match(/:(\d+)$/)[1] || '80') + "\0";
      req += "SERVER_NAME\0" + (request.headers['host'].replace(/:\d+/, '')) + "\0";
      _ref = request.headers;
      for (key in _ref) {
        val = _ref[key];
        req += "HTTP_" + (key.toUpperCase().replace('-', '_')) + "\0" + request.headers[key] + "\0";
      }
      req = "" + req.length + ":" + req + "," + encPost;
      if (dispatch.logging) {
        dispatch.log("Sending '" + req + "' of length " + req.length + " to SCGI");
      }
      return sock.write(req);
    };
    dispatch.scgi_pass = function(conn, request, response) {
      var conn_options, d, getData;
      if (!isNaN(parseInt(conn))) {
        conn_options = {
          port: parseInt(conn)
        };
      } else {
        conn_options = {
          path: conn
        };
      }
      getData = function() {
        var client, retval;
        retval = "";
        client = net.connect(conn_options, function() {
          return dispatch.sendSCGIRequest(request, client);
        });
        client.on('data', function(data) {
          return retval += data;
        });
        return client.on('end', function(data) {
          var contentType, contentTypeDone, headerSet, index, line, lines, m, status, statusDone, writeThis, _i, _len;
          if (data) {
            retval += data;
          }
          dispatch.log("Ending SCGI transaction");
          retval = retval.replace(/\r/g, '');
          lines = retval.split('\n');
          statusDone = false;
          contentTypeDone = false;
          headerSet = false;
          status = 0;
          contentType = '';
          for (index = _i = 0, _len = lines.length; _i < _len; index = ++_i) {
            line = lines[index];
            dispatch.log("LINE #" + (index + 1) + ": " + line);
            if (!headerSet) {
              writeThis = true;
              if (!statusDone) {
                m = line.match(/Status: (\d+)/i);
                if (m) {
                  writeThis = false;
                  statusDone = true;
                  status = m[1];
                  dispatch.log("Detected status: " + status);
                  if (contentTypeDone) {
                    dispatch.log("Response: Status " + status + "  - Content-Type: " + contentType);
                    response.writeHead(status, {
                      'Content-Type': contentType || 'text/plain'
                    });
                    headerSet = true;
                  }
                }
              }
              if (!contentTypeDone) {
                m = line.match(/Content\-Type\:\s+(.+\/.+)/i);
                if (m) {
                  writeThis = false;
                  contentTypeDone = true;
                  contentType = m[1];
                  dispatch.log("Detected Content-Type: " + contentType);
                  if (statusDone) {
                    dispatch.log("Response: Status " + status + "  - Content-Type: " + contentType);
                    response.writeHead(status, {
                      'Content-Type': contentType || 'text/plain'
                    });
                    headerSet = true;
                  }
                }
              }
              if (writeThis) {
                response.write(line);
              }
            } else {
              response.write(line);
            }
          }
          return response.end();
        });
      };
      d = domain.create();
      d.on('error', function(e) {
        response.writeHead(502, 'Bad gateway', {
          'Content-Type': 'text/plain'
        });
        return response.end("502 - Bad gateway\n\n\n" + e.message);
      });
      return d.run(getData);
    };
    dispatch.proxy_pass = function(url, response) {
      return http.get(url, function(res) {
        return res.pipe(response);
      });
    };
    dispatch.directory = function(fpath, path, res) {
      var resp;
      resp = _dirlist_template;
      while (resp.indexOf("<%= @cwd %>") !== -1) {
        resp = resp.replace("<%= @cwd %>", path);
      }
      return fs.readdir(fpath, function(err, files) {
        var file, links;
        if (err) {
          return dispatch._404(null, res, path);
        } else {
          links = ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              file = files[_i];
              _results.push("<li><a href='" + path + "/" + (querystring.escape(file)) + "'>" + file + "</a></li>");
            }
            return _results;
          })()).join('');
          resp = resp.replace("<%= @cwd_contents %>", links);
        }
        res.writeHead(200, {
          'Content-type': 'text/html'
        });
        return res.end(resp);
      });
    };
    dispatch.get = function(pattern, callback) {
      return _pushRoute(pattern, callback, 'get');
    };
    dispatch.post = function(pattern, callback) {
      return _pushRoute(pattern, _make_request_wrapper(callback), 'post');
    };
    dispatch.put = function(pattern, callback) {
      return _pushRoute(pattern, _make_request_wrapper(callback), 'put');
    };
    dispatch["delete"] = function(pattern, callback) {
      return _pushRoute(pattern, callback, 'delete');
    };
    dispatch.del = function(pattern, callback) {
      return _pushRoute(pattern, callback, 'delete');
    };
    dispatch._404 = function(req, res, path) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      return res.end("<h2>404 - Resource " + path + " not found at this server</h2>\n<hr/><h3>Served by " + dispatch.served_by + " v" + dispatch.version + "</h3>\n<p style=\"text-align: center;\"><button onclick='history.back();'>Back</button></p>");
    };
    dispatch._405 = function(req, res, path, message) {
      res.writeHead(405, {
        'Content-Type': 'text/html'
      });
      return res.end("<h2>405 - Resource " + path + ": " + message + "</h2>\n<hr/><h3>Served by " + dispatch.served_by + " v" + dispatch.version + "</h3>\n<p style=\"text-align: center;\"><button onclick='history.back();'>Back</button></p>");
    };
    dispatch._500 = function(req, res, path, message) {
      res.writeHead(500, {
        'Content-Type': 'text/html'
      });
      return res.end("  <h2>500 - Internal server error at " + path + ": " + message + "</h2>\n  <hr/><h3>Served by " + dispatch.served_by + " v" + dispatch.version + "</h3>\n<p style=\"text-align: center;\"><button onclick='history.back();'>Back</button></p>");
    };
    return dispatch;
  };

  module.exports = Router;

}).call(this);
