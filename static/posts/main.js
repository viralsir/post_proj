console.log("hello world")

const postsdBox=document.getElementById("posts-box");
const sppinnerBox=document.getElementById("spinner-box")
const loadBtn=document.getElementById("load-btn")
const endBox=document.getElementById('end-box')

const getCookie=(name)=> {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const likeUnlikePosts = ()=>{
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
    console.log(likeUnlikeForms)
    likeUnlikeForms.forEach(form=>form.addEventListener('submit',e=>{
        e.preventDefault()
        const clickedId = e.target.getAttribute('data-form-id')
    }))

}
const csrftoken = getCookie('csrftoken');


let visible=3

const getData = ()=>{

$.ajax({
    type:'GET',
    url:`/data/${visible}`,
    success:function (response){
        console.log("inside getData");
        const data=response.data
        setTimeout(()=>{
                sppinnerBox.classList.add('non-visible')
                data.forEach(el=>{
                    postsdBox.innerHTML +=`
                      <div class="card mb-2">
                      
                      <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.body}</p>
                      
                      </div>
                      <div class="card-footer">
                             <div class="row">
                                 <div class="col-1"><a href="#" class="btn btn-primary">Details</a></div>
                                 <div class="col-1">
                                 <form class="like-unlike-forms" data-forms-id="${el.id}">
                                   {% csrf_token %}
                                    <a href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unlike(${el.count})`:`Like(${el.count})`}</a></div>
                                 </form>
                              </div>
                              
                      </div>
                    </div>
                    `
                })
        },100)
        console.log(response.size);
        if(response.size === 0){
            endBox.textContent="No Posts added yet...."
        }
        else if (response.size <= visible){
            loadBtn.classList.add('non-visible')
            endBox.textContent='No more posts to load..'
        }
    },
    error:function (error){
        console.log("error",error);
    }

})

}

loadBtn.addEventListener('click',()=>{
 sppinnerBox.classList.remove('non-visible')
 visible +=3
 getData()
})

getData()


