export const imageShow = (src, theme) => {
  return (
    <img src={src}
    //   img.camera
    //     ? img.camera
    //     : img.url
    //       ? img.url : URL.createObjectURL(img)
    // }
      alt="images" className="img-thumbnail"
      style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
    />
  )
}

export const videoShow = (src, theme) => {
  return (
    <video controls src={src}
    //   img.camera
    //     ? img.camera
    //     : img.url
    //       ? img.url : URL.createObjectURL(img)
    // }
      alt="images" className="img-thumbnail"
      style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
    />
  )
}