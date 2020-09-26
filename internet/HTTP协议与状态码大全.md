### HTTP

- 协议：计算机通信网络中2台计算机之间进行通信必须共同遵守的规则

- 超文本传输协议HTTP：允许将超文本标记语言HTML文档从web服务器传送到客户端的浏览器

- HTTP协议，是一种详细规定了浏览器和万维网WWW服务器之间互相通信的规则，通过internet传送万维网文档的数据

- HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务模型。HTTP是无状态的协议、

- 在internet中所有的传输都是通过TCP/IP来进行的。HTTP协议作为TCP/IP模型中应用层的协议也不例外。

- HTTP协议通常承载于TCP协议之上，有时也承载于TLS/SSL协议层之上，这时就是常说的HTTPS了。

![HTTP](../img/http01.png)

  - 应用层（HTTP）
  - 传输层 TCP
  - 网络层 IP
  - 数据链路层 （网络接口层）

- HTTP默认的端口号是80， HTTPS的端口是443

- HTTP特点
  - 永远都是客户端发起请求，服务端回送响应。这样就限制了HTTP协议，无法实现在客户端没有发请求时，服务端将消息推送给客户端

  - HTTP的主要特点：
    - 1.支持客户/服务端模式。支持基本认证和安全认证
    - 2.简单快速：客户想服务器请求服务，只需要传送请求方法和路径。请求方法常用的有GET、POST、HEAD。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度快
    - 3.灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记
    - 4.HTTP 0.9和1.0使用非持续连续：限制每次连接只处理一个请求，服务器处理完客户的请求，并收到客户的应答后，即断开连接。HTTP 1.1使用持续连接：不必为每个web对象创建一个新的连接，一个连接可以传送多个对象，采用这种方式可以节省传输时间。
    - 5.无状态：HTTP是无状态协议。指的是对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样导致每次连接传送的数据量增大

- HTTP协议是无状态的和Connections：keep-alive的区别：
  - 无状态指的是协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。
  - HTTP是一个无状态的面向连接的协议，无状态不代表HTTP不能保持TCP连接，更不能代表HTTP使用的是UDP协议（无连接）
  - 从HTTP 1.1开始，默认开启了Keep-Alive，保持连接特性，简单地说，当一个网页打开完成后，客户端和服务端之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这条已经建立的连接
  - Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件上设定这个时间

### 状态码大全

- 状态码被分为5大类：
  - 100-199：用于指定客户端相应的某些动作
  - 200-299：用于表示请求成功
  - 300-399：用于指出客户端的错误
  - 400-499：用于指出客户端的错误
  - 500-599：用于指出服务器错误

- 100(Continue/继续)
  - 若服务器收到头信息带有100-continue的请求，这是指客户端询问是否可以在后续的请求中发送附件。在这种情况下，服务器用100(SC_CONTINUE)允许客户端继续或用407(Expectation Failed)告诉客户端不同意接受附件。这种状态码是HTTP 1.1 中新加的

- 101(Switching Protovols/转换协议)

- 101(SC_SWITCHING_PROTOCOLS)状态码是指服务器将按照其上的头信息变为一个不同的协议。这是 HTTP 1.1中新加入的

- 200(OK/正常)

- 200(SC_OK)的意思是一切正常。一般用于相应GET和POST请求。这个状态码对servlet是缺省的;如果没有调用setStatus方法的话，就会得到200。

- 201(Created/已创建)

- 201 (SC_CREATED)表示服务器在请求的响应中建立了新文档;应在定位头信息中给出它的URL

- 202(Accepted/接受)

- 202(SC_ACCEPTED)告诉客户端请求正在被执行，但还没有处理完。

- 203(Non-Authoritative Information/非官方信息)
  - 状态码203 (SC_NON_AUTHORITATIVE_INFORMATION)是表示文档被正常的返回，但是由于正在使用的是文档副本所以某些响应头信息可能不正确。这是 HTTP 1.1中新加入的

- 204(No Content/无内容)

- 205 (Reset Content/重置内容)

- 205 (SC_RESET_CONTENT)的意思是虽然没有新文档但浏览器要重置文档显示。这个状态码用于强迫浏览器清除表单域。这是 HTTP 1.1中新加入的

- 206(Partial Content/局部内容)

- 206(SC_PARTIAL_CONTENT)是在服务器完成了一个包含Range头信息的局部请求时被发送的。这是 HTTP 1.1中新加入的

- 300 (Multiple Choices/多重选择)

- 300 (SC_MULTIPLE_CHOICES)表示被请求的文档可以在多个地方找到，并将在返回的文档中列出来。如果服务器有首选设置，首选项将会被列于定位响应头信息中

- 301 (Moved Permanently)

- 301 SC_MOVED_PERMANENTLY)状态是指所请求的文档在别的地方;文档新的URL会在定位响应头信息中给出。浏览器会自动连接到新的URL

- 302 (Found/找到)
  - 代表状态码302的常量是SC_MOVED_TEMPORARILY而不是SC_FOUND

- 303 (See Other/参见其他信息)
  - 这个状态码和 301、302 相似，只是如果最初的请求是 POST，那么新文档(在定位头信息中给出)要用 GET 找回。这个状态码是新加入 HTTP 1.1中的

- 304 (Not Modified/未修正)
  - 当客户端有一个缓存的文档，通过提供一个 If-Modified-Since 头信息可指出客户端只希望文档在指定日期之后有所修改时才会重载此文档，用这种方式可以进行有条件的请求。304 (SC_NOT_MODIFIED)是指缓冲的版本已经被更新并且客户端应刷新文档。另外，服务器将返回请求的文档及状态码 200

- 305 (Use Proxy/ 使用代理)

- 305 (SC_USE_PROXY) 表示所请求的文档要通过定位头信息中的代理服务器获得。这个状态码是新加入HTTP1.1中的

- 307 (Temporary Redirect/ 临时重定向)
  - 浏览器处理307状态的规则与302相同。307状态被加入到 HTTP 1.1中是由于许多浏览器在收到302响应时即使是原始消息为POST的情况下仍然执行了错误的转向。只有在收到303响应时才假定浏览器会在POST请求时重定向。添加这个新的状态码的目的很明确：在响应为303时按照GET和POST请求转向;而在307响应时则按照GET请求转向而不是POST请求。注意：由于某些原因在HttpServletResponse中还没有与这个状态对应的常量。该状态码是新加入HTTP 1.1中的

- 400 (Bad Request/错误请求)

- 400 (SC_BAD_REQUEST)指出客户端请求中的语法错误。

- 401 (Unauthorized/未授权)

- 401 (SC_UNAUTHORIZED)表示客户端在授权头信息中没有有效的身份信息时访问受到密码保护的页面。这个响应必须包含一个WWW-Authenticate的授权信息头

- 403 (Forbidden/禁止)

- 403 (SC_FORBIDDEN)的意思是除非拥有授权否则服务器拒绝提供所请求的资源。这个状态经常会由于服务器上的损坏文件或目录许可而引起

- 404 (Not Found/未找到)

- 404(SC_NOT_FOUND)状态每个网络程序员可能都遇到过，他告诉客户端所给的地址无法找到任何资源。它是表示“没有所访问页面”的标准方式。这个状态码是常用的响应并且在HttpServletResponse类中有专门的方法实现它：sendError("message")。相对于setStatus使用sendError得好处是：服务器会自动生成一个错误页来显示错误信息。但是，Internet Explorer 5浏览器却默认忽略你发挥的错误页面并显示其自定义的错误提示页面，虽然微软这么做违反了 HTTP 规范。要关闭此功能，在工具菜单里，选择Internet选项，进入高级标签页，并确认“显示友好的 HTTP 错误信息”选项(在我的浏览器中是倒数第8各选项)没有被选。但是很少有用户知道此选项，因此这个特性被IE5隐藏了起来使用户无法看到你所返回给用户的信息。而其他主流浏览器及IE4都完全的显示服务器生成的错误提示页面

- 405 (Method Not Allowed/方法未允许)

- 405 (SC_METHOD_NOT_ALLOWED)指出请求方法(GET, POST, HEAD, PUT, DELETE, 等)对某些特定的资源不允许使用。该状态码是新加入 HTTP 1.1中的

- 406 (Not Acceptable/无法访问)

- 406 (SC_NOT_ACCEPTABLE)表示请求资源的MIME类型与客户端中Accept头信息中指定的类型不一致。见本书7.2部分中的表7.1(HTTP 1.1 Response Headers and Their Meaning/HTTP 1.1响应头信息以及他们的意义)中对MIME类型的介绍。406是新加入 HTTP 1.1中的

- 407 (Proxy Authentication Required/代理服务器认证要求)

- 407 (SC_PROXY_AUTHENTICATION_REQUIRED)与401状态有些相似，只是这个状态用于代理服务器。该状态指出客户端必须通过代理服务器的认证。代理服务器返回一个Proxy-Authenticate响应头信息给客户端，这会引起客户端使用带有Proxy-Authorization请求的头信息重新连接。该状态码是新加入 HTTP 1.1中的

- 408 (Request Timeout/请求超时)

- 408 (SC_REQUEST_TIMEOUT)是指服务端等待客户端发送请求的时间过长。该状态码是新加入 HTTP 1.1中的。

- 409 (Conflict/冲突)
  - 该状态通常与PUT请求一同使用，
  
- 409 (SC_CONFLICT)状态常被用于试图上传版本不正确的文件时。该状态码是新加入 HTTP 1.1中的。

- 410 (Gone/已经不存在)

- 410 (SC_GONE)告诉客户端所请求的文档已经不存在并且没有更新的地址。410状态不同于404，410是在指导文档已被移走的情况下使用，而404则用于未知原因的无法访问。该状态码是新加入 HTTP 1.1中的。

- 411 (Length Required/需要数据长度)

- 411 (SC_LENGTH_REQUIRED)表示服务器不能处理请求(假设为带有附件的POST请求)，除非客户端发送Content-Length头信息指出发送给服务器的数据的大小。该状态是新加入 HTTP 1.1的。

- 412 (Precondition Failed/先决条件错误)

- 412 (SC_PRECONDITION_FAILED)状态指出请求头信息中的某些先决条件是错误的。该状态是新加入 HTTP 1.1的。

- 413 (Request Entity Too Large/请求实体过大)

- 413 (SC_REQUEST_ENTITY_TOO_LARGE)告诉客户端现在所请求的文档比服务器现在想要处理的要大。如果服务器认为能够过一段时间处理，则会包含一个Retry-After的响应头信息。该状态是新加入 HTTP 1.1的。

- 414 (Request URI Too Long/请求URI过长)

- 414 (SC_REQUEST_URI_TOO_LONG)状态用于在URI过长的情况时。这里所指的“URI”是指URL中主机、域名及端口号之后的内容。例如：在URL--http://www.y2k-disaster.com:8080/we/look/silly/now/中URI是指/we/look/silly/now/。该状态是新加入 HTTP 1.1的。

- 415 (Unsupported Media Type/不支持的媒体格式)

- 415 (SC_UNSUPPORTED_MEDIA_TYPE)意味着请求所带的附件的格式类型服务器不知道如何处理。该状态是新加入 HTTP 1.1的

- 416 (Requested Range Not Satisfiable/请求范围无法满足)

- 416表示客户端包含了一个服务器无法满足的Range头信息的请求。该状态是新加入 HTTP 1.1的。奇怪的是，在servlet 2.1版本API的HttpServletResponse中并没有相应的常量代表该状态

- 417 (Expectation Failed/期望失败)
  - 如果服务器得到一个带有100-continue值的Expect请求头信息，这是指客户端正在询问是否可以在后面的请求中发送附件。在这种情况下，服务器也会用该状态(417)告诉浏览器服务器不接收该附件或用100 (SC_CONTINUE)状态告诉客户端可以继续发送附件。该状态是新加入 HTTP 1.1的

- 500 (SC_INTERNAL_SERVER_ERROR) 是常用的“服务器错误”状态。该状态经常由CGI程序引起也可能(但愿不会如此!)由无法正常运行的或返回头信息格式不正确的servlet引起。

- 501 (Not Implemented/未实现)

- 501 (SC_NOT_IMPLEMENTED)状态告诉客户端服务器不支持请求中要求的功能。例如，客户端执行了如PUT这样的服务器并不支持的命令

- 502 (Bad Gateway/错误的网关)

- 502 (SC_BAD_GATEWAY)被用于充当代理或网关的服务器;该状态指出接收服务器接收到远端服务器的错误响应。

- 503 (Service Unavailable/服务无法获得)

- 503 (SC_SERVICE_UNAVAILABLE)表示服务器由于在维护或已经超载而无法响应。例如，如果某些线程或数据库连接池已经没有空闲则servlet会返回这个头信息。服务器可提供一个Retry-After头信息告诉客户端什么时候可以在试一次。

- 504 (Gateway Timeout/网关超时)
  - 该状态也用于充当代理或网关的服务器;它指出接收服务器没有从远端服务器得到及时的响应。该状态是新加入 HTTP 1.1的。

- 505 (HTTP Version Not Supported/不支持的 HTTP 版本)

- 505 (SC_HTTP_VERSION_NOT_SUPPORTED)状态码是说服务器并不支持在请求中所标明 HTTP 版本。该状态是新加入 HTTP 1.1的