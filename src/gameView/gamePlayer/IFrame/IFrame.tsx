import React, { useEffect } from 'react';

interface Props {
  githubURL: string,
  commitSHA: string,
  iframeRef: any
}

const IFrame = ({ githubURL, commitSHA, iframeRef }: Props) => {
  useEffect(() => {
    const handler = (event: MessageEvent<any>) => {
      if (event.origin === 'null') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = JSON.parse(event.data);
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, []);

  console.log('loading iframe for', githubURL, commitSHA);

  return (
    <iframe
      title="gameFrame"
      sandbox="allow-scripts"
      srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            <script>
              console.log("hello world")
              window.addEventListener('message', (message)=>{
                console.log("iframe received message:", message)
              });
            </script>
          </head>
          <body>
            <h1>Content inside an iframe, who knew...</h1>
          </body>
        </html>
      `}
      id="gameFrame"
      ref={iframeRef}
      style={{ height: 'calc(100vh - 50px)', width: '100%', border: 'none' }}
    />
  );
};

export default IFrame;
