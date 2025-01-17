const url = "https://api.github.com/users"
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");


const generateProfile = (profile) => {
    return  `<div class="profile-box">
    <div class="top-section">
        <div class="left">
            <div class="avatar">
                <img src= "${profile.avatar_url}" alt="img"/>
            </div>
            <div class="self">
                <h1>${profile.name}</h1>
                <h1>${profile.login}</h1>
            </div>
        </div>
        <a href="https://github.com/${profile.login}" target="_blank">
        <button class="primary-btn">check profile</button>
        </a>
    </div>
    <div class="about">
        <h2>About</h2>
        <p>${profile.bio}</p>
    </div>
    <div class="status">
        <div class="status-item">
            <h3>Followers</h3>
            <p>${profile.followers}</p>
        </div>
        <div class="status-item">
            <h3>Following</h3>
            <p>${profile.following}</p>
        </div>
        <div class="status-item">
            <h3>Repos</h3>
            <p>${profile.public_repos}</p>
        </div>
    </div>
</div>`

}

const fetchProfile = async () => {
    const userName = searchInputEl.value;
    loadingEl.innerText = "Loading..."
    loadingEl.style.color = "black"
    try {
        const responce = await fetch(`${url}/${userName}`);
        const data = await responce.json();
        if (data.bio) {
            loadingEl.innerText = ""
            profileContainerEl.innerHTML = generateProfile(data);
        }else{
           loadingEl.innerHTML = data.message;
           loadingEl.style.color = "red"
           profileContainerEl.innerText = ""
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


searchButtonEl.addEventListener("click", fetchProfile)