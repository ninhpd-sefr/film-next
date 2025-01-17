export const MoviePlayer = ({ linkEmbed }: { linkEmbed: string }) => {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <iframe
        src={linkEmbed}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Movie Player"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
