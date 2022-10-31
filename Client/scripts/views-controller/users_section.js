document.querySelector('#users-list').addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(e.target);

    if(e.target.classList.contains('btn-delete')){
        console.log('delete');
    }

    if(e.target.classList.contains('btn-edit')){
        console.log('edit');
    }

    
})