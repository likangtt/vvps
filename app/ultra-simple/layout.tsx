export default function UltraSimpleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>超简单测试</title>
        <style>{`
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: white;
            color: black;
          }
          h1 { color: red; }
          h2 { color: blue; }
          a { color: green; text-decoration: underline; }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}