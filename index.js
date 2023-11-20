

const http = require('http');

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Alice Smith' },
    { id: 3, name: 'Bob Johnson' }
];

let posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
];

const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    } else if (req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (dataChunk) => {
            body += dataChunk;
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            users.push(newUser);
            res.end('User added successfully');
        });
    } else if (req.url === '/users/sorted' && req.method === 'GET') {
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(sortedUsers));
    } else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        const userId = parseInt(req.url.split('/')[2]);
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            res.end('User deleted successfully');
        } else {
            res.end('User not found');
        }
    } else if (req.url.startsWith('/users/') && req.method === 'PUT') {
        const userId = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', (dataChunk) => {
            body += dataChunk;
        });
        req.on('end', () => {
            const updatedUser = JSON.parse(body);
            const index = users.findIndex(u => u.id === userId);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                res.end('User updated successfully');
            } else {
                res.end('User not found');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Error: Endpoint not found');
    }

    if (req.url === '/posts' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(posts));
  }
  
  else if (req.url === '/posts' && req.method === 'POST') {
      let body = '';
      req.on('data', (dataChunk) => {
          body += dataChunk;
      });
      req.on('end', () => {
          const newPost = JSON.parse(body);
          posts.push(newPost);
          res.end('Post added successfully');
      });
  }
  
  
  else if (req.url.startsWith('/posts/') && req.method === 'GET') {
      const postId = parseInt(req.url.split('/')[2]);
      const post = posts.find(p => p.id === postId);
      if (post) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(post));
      } else {
          res.statusCode = 404;
          res.end('Post not found');
      }
  }
  
  else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
      const postId = parseInt(req.url.split('/')[2]);
      const index = posts.findIndex(p => p.id === postId);
      if (index !== -1) {
          posts.splice(index, 1);
          res.end('Post deleted successfully');
      } else {
          res.statusCode = 404;
          res.end('Post not found');
      }
  }
  
  
  else if (req.url.startsWith('/posts/') && req.method === 'PUT') {
      const postId = parseInt(req.url.split('/')[2]);
      let body = '';
      req.on('data', (dataChunk) => {
          body += dataChunk;
      });
      req.on('end', () => {
          const updatedPost = JSON.parse(body);
          const index = posts.findIndex(p => p.id === postId);
          if (index !== -1) {
              posts[index] = { ...posts[index], ...updatedPost };
              res.end('Post updated successfully');
          } else {
              res.statusCode = 404;
              res.end('Post not found');
          }
      });
  }
});



 
       




server.listen(3000, () => {
    console.log('Server is running');
});


