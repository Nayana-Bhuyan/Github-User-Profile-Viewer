document.getElementById('searchBtn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a valid GitHub username.');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const profile = document.getElementById('profile');
            profile.style.display = 'block';
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').textContent = data.name || data.login;
            document.getElementById('bio').textContent = data.bio || 'No bio available';
            document.getElementById('location').textContent = `Location: ${data.location || 'Not specified'}`;
            document.getElementById('repos').textContent = `Repositories: ${data.public_repos}`;
            document.getElementById('followers').textContent = `Followers: ${data.followers}`;
            document.getElementById('following').textContent = `Following: ${data.following}`;
            document.getElementById('githubLink').href = data.html_url;
        })
        .catch(error => {
            alert(`Failed to fetch user profile: ${error.message}`);
        });
});