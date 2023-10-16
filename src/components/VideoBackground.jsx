export const VideoBackground = ({ source }) => {
  return (
    <video
      autoPlay
      // loop
      muted
      className="absolute top-0 bottom-0 left-0 right-0  object-cover w-full h-full gradient-carousel -z-[1]"
    >
      <source src={source} type="video/mp4" />
    </video>
  )
}
