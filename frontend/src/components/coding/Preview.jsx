import React, { useMemo } from 'react'


const Preview = ({ tree }) => {
  const srcDoc = useMemo(() => {
    let html = "";
    let css = "";
    let js = "";

    const traverse = (items = []) => {
      for (const item of items) {
        if (item.type === 'file') {
          if (item.name === "index.html") {
            html = item.content || "";
          }

          if (item.name?.endsWith('.css')) css = item.content || "";
          if (item.name?.endsWith('.js')) js = item.content || "";
        }

        if (item.children?.length) traverse(item.children);
      }
    };

    traverse(tree);

    if (!html) {
      return `
    <!DOCTYPE html>
    <html>
      <body>
        <h2 style="color:red;font-family:Arial">
          No HTML page found. Please create an index.html file.
        </h2>
      </body>
    </html>
  `;
    }

    if (css) {
      html = html.includes("</head>")
        ? html.replace("</head>", `<style>${css}</style></head>`)
        : `<style>${css}</style>${html}`;
    }

    if (js) {
      const script = `<script>
    ${js}
  <\/script>`;

      html = html.replace("</body>", `${script}</body>`);
    }

    return html;
  }, [tree]);
  return (
    <div className='flex h-full w-full flex-col bg-white'>
      <div className='flex h-10 shrink-0 items-center bg-black px-4'>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-emerald-400' />
          <div className='text-lg text-zinc-300 '>Preview</div>
        </div>
      </div>

      <div className='min-h-0 flex-1 bg-white'>
        <iframe

          title='project preview'
          srcDoc={srcDoc}
          sandbox='allow-scripts allow-forms allow-modals allow-same-origin'
          className='h-full w-full border-0'
        />
      </div>
    </div>
  )
}

export default Preview