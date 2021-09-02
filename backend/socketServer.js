let users = []

const SocketServer = (socket) => {
  //Connect - Disconnect
  socket.on('joinUser', id => {
    users.push({ id, socketId: socket.id })
  })
  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id)
  })
  
  //Like
  socket.on('unLikePost', newPost => {
    //console.log(newPost)
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))
    //console.log(client)
    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
      })
    }
  })

  //unLike
  socket.on('likePost', newPost => {
    //console.log(newPost)
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))
    //console.log(client)
    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost)
      })
    }
  })

  //Comment
  socket.on('createComment', newPost => {
    //console.log(newPost)
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))
    //console.log(client)
    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
      })
    }
  })
}

module.exports = SocketServer