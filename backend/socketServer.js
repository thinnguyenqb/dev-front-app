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

  socket.on('deleteComment', newPost => {
    //console.log(newPost)
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter(user => ids.includes(user.id))
    //console.log(client)
    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
      })
    }
  })

  //Follow
  socket.on('follow', newUser => {
    const user = users.find(user => user.id === newUser._id)
    user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
  })

  socket.on('unFollow', newUser => {
    const user = users.find(user => user.id === newUser._id)
    user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
  })

  //Notification
  socket.on('createNotify', msg => {
    const client = users.find(user => msg.recipients.includes(user.id))
    client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
  })

  socket.on('deleteNotify', msg => {
    const client = users.find(user => msg.recipients.includes(user.id))
    client && socket.to(`${client.socketId}`).emit('deleteNotifyToClient', msg)
  })
}

module.exports = SocketServer