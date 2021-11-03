const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('Title').value.trim();
    const body = document.querySelector('textarea[name="post-body"]').value.trim();
    
    //create event listener here/button
    
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to create project');
      }
    };