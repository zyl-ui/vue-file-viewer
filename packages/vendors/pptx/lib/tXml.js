/////////////////////////////////////tXml///////////////////////////
/*
This is my custom tXml.js file
*/
function tXml(t, r) {
  'use strict'
  function e() {
    for (var r = []; t[l]; )
      if (t.charCodeAt(l) == s) {
        if (t.charCodeAt(l + 1) === h)
          return (l = t.indexOf(u, l)), l + 1 && (l += 1), r
        if (t.charCodeAt(l + 1) === v) {
          if (t.charCodeAt(l + 2) == m) {
            for (
              ;
              -1 !== l &&
              (t.charCodeAt(l) !== d ||
                t.charCodeAt(l - 1) != m ||
                t.charCodeAt(l - 2) != m ||
                -1 == l);

            )
              l = t.indexOf(u, l + 1)
            ;-1 === l && (l = t.length)
          } else for (l += 2; t.charCodeAt(l) !== d && t[l]; ) l++
          l++
          continue
        }
        var e = a()
        r.push(e)
      } else {
        var i = n()
        i.trim().length > 0 && r.push(i), l++
      }
    return r
  }
  function n() {
    var r = l
    return (
      (l = t.indexOf(c, l) - 1), -2 === l && (l = t.length), t.slice(r, l + 1)
    )
  }
  function i() {
    for (var r = l; -1 === A.indexOf(t[l]) && t[l]; ) l++
    return t.slice(r, l)
  }
  function a() {
    var r = {}
    l++, (r.tagName = i())
    for (var n = !1; t.charCodeAt(l) !== d && t[l]; ) {
      var a = t.charCodeAt(l)
      if ((a > 64 && 91 > a) || (a > 96 && 123 > a)) {
        for (
          var f = i(), c = t.charCodeAt(l);
          c &&
          c !== p &&
          c !== g &&
          !((c > 64 && 91 > c) || (c > 96 && 123 > c)) &&
          c !== d;

        )
          l++, (c = t.charCodeAt(l))
        if ((n || ((r.attributes = {}), (n = !0)), c === p || c === g)) {
          var s = o()
          if (-1 === l) return r
        } else (s = null), l--
        r.attributes[f] = s
      }
      l++
    }
    if (t.charCodeAt(l - 1) !== h)
      if ('script' == r.tagName) {
        var u = l + 1
        ;(l = t.indexOf('</script>', l)),
          (r.children = [t.slice(u, l - 1)]),
          (l += 8)
      } else if ('style' == r.tagName) {
        var u = l + 1
        ;(l = t.indexOf('</style>', l)),
          (r.children = [t.slice(u, l - 1)]),
          (l += 7)
      } else -1 == C.indexOf(r.tagName) && (l++, (r.children = e(f)))
    else l++
    return r
  }
  function o() {
    var r = t[l],
      e = ++l
    return (l = t.indexOf(r, e)), t.slice(e, l)
  }
  function f() {
    var e = new RegExp(
      '\\s' + r.attrName + '\\s*=[\'"]' + r.attrValue + '[\'"]'
    ).exec(t)
    return e ? e.index : -1
  }
  r = r || {}
  var l = r.pos || 0,
    c = '<',
    s = '<'.charCodeAt(0),
    u = '>',
    d = '>'.charCodeAt(0),
    m = '-'.charCodeAt(0),
    h = '/'.charCodeAt(0),
    v = '!'.charCodeAt(0),
    p = "'".charCodeAt(0),
    g = '"'.charCodeAt(0),
    A = '\n	>/= ',
    C = ['img', 'br', 'input', 'meta', 'link'],
    y = null
  if (void 0 !== r.attrValue) {
    r.attrName = r.attrName || 'id'
    for (var y = []; -1 !== (l = f()); )
      (l = t.lastIndexOf('<', l)),
        -1 !== l && y.push(a()),
        (t = t.substr(l)),
        (l = 0)
  } else y = r.parseNode ? a() : e()
  return (
    r.filter && (y = tXml.filter(y, r.filter)),
    r.simplify && (y = tXml.simplify(y)),
    (y.pos = l),
    y
  )
}
var _order = 1
;(tXml.simplify = function(t) {
  var r = {}
  if (void 0 === t) return {}
  if (1 === t.length && 'string' == typeof t[0]) return t[0]
  t.forEach(function(t) {
    if ('object' == typeof t) {
      r[t.tagName] || (r[t.tagName] = [])
      var e = tXml.simplify(t.children || [])
      r[t.tagName].push(e),
        t.attributes && (e.attrs = t.attributes),
        void 0 === e.attrs
          ? (e.attrs = { order: _order })
          : (e.attrs.order = _order),
        _order++
    }
  })
  for (var e in r) 1 == r[e].length && (r[e] = r[e][0])
  return r
}),
  (tXml.filter = function(t, r) {
    var e = []
    return (
      t.forEach(function(t) {
        if (('object' == typeof t && r(t) && e.push(t), t.children)) {
          var n = tXml.filter(t.children, r)
          e = e.concat(n)
        }
      }),
      e
    )
  }),
  (tXml.stringify = function(t) {
    function r(t) {
      if (t)
        for (var r = 0; r < t.length; r++)
          'string' == typeof t[r] ? (n += t[r].trim()) : e(t[r])
    }
    function e(t) {
      n += '<' + t.tagName
      for (var e in t.attributes)
        n +=
          null === t.attributes[e]
            ? ' ' + e
            : -1 === t.attributes[e].indexOf('"')
            ? ' ' + e + '="' + t.attributes[e].trim() + '"'
            : ' ' + e + "='" + t.attributes[e].trim() + "'"
      ;(n += '>'), r(t.children), (n += '</' + t.tagName + '>')
    }
    var n = ''
    return r(t), n
  }),
  (tXml.toContentString = function(t) {
    if (Array.isArray(t)) {
      var r = ''
      return (
        t.forEach(function(t) {
          ;(r += ' ' + tXml.toContentString(t)), (r = r.trim())
        }),
        r
      )
    }
    return 'object' == typeof t ? tXml.toContentString(t.children) : ' ' + t
  }),
  (tXml.getElementById = function(t, r, e) {
    var n = tXml(t, { attrValue: r, simplify: e })
    return e ? n : n[0]
  }),
  (tXml.getElementsByClassName = function(t, r, e) {
    return tXml(t, {
      attrName: 'class',
      attrValue: '[a-zA-Z0-9-s ]*' + r + '[a-zA-Z0-9-s ]*',
      simplify: e
    })
  }),
  (tXml.parseStream = function(t, r) {
    if (
      ('function' == typeof r && ((cb = r), (r = 0)),
      'string' == typeof r && (r = r.length + 2),
      'string' == typeof t)
    ) {
      var e = require('fs')
      ;(t = e.createReadStream(t, { start: r })), (r = 0)
    }
    var n = r,
      i = '',
      a = 0
    return (
      t.on('data', function(r) {
        a++, (i += r)
        for (var e = 0; ; ) {
          n = i.indexOf('<', n) + 1
          var o = tXml(i, { pos: n, parseNode: !0 })
          if (((n = o.pos), n > i.length - 1 || e > n))
            return void (e && ((i = i.slice(e)), (n = 0), (e = 0)))
          t.emit('xml', o), (e = n)
        }
        ;(i = i.slice(n)), (n = 0)
      }),
      t.on('end', function() {
        console.log('end')
      }),
      t
    )
  }),
  'object' == typeof module && (module.exports = tXml)
