import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/agentive_webclip.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.fbAsyncInit = function() {
                                  FB.init({
                                    appId            : '${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}',
                                    autoLogAppEvents : true,
                                    xfbml            : true,
                                    version          : 'v18.0'
                                  });
                                };
                            `,
                        }}
                    />
                    <script
                        async
                        defer
                        crossOrigin="anonymous"
                        src="https://connect.facebook.net/en_US/sdk.js"
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
