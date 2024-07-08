$('.searchInput').hide();
$('.fa-search').on('mouseover', function(){
    $('.navbar-nav').slideUp(300)
    $('.searchInput').slideDown(350)
    // $('.searchInput').fadeIn(2000)
    // $('searchInput').focus()
    document.querySelector('.searchInput').focus()
})
$('.searchInput').on('focusout', function(){
    $('.searchInput').slideUp(200),
    $('.navbar-nav').slideDown(300)
    // $('.searchInput').fadeIn(2000)
})

$(document).ready(function(){
    var stickyNavTop = $('.navbar').offset().top;
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop > stickyNavTop){
            $('.navbar').addClass('sticky', 1000);
            $('.navbar').css('backgroundColor', '#4A249D');
            $('.navBrand').show(1000);
            $('.logo').slideUp(100);
        } else{
            $('.navbar').removeClass('sticky', 1000);
            $('.navbar').css('backgroundColor', '');
            $('.navBrand').hide(1000);
            $('.logo').slideDown(100);
        }
    };
    stickyNav();
    $(window).scroll(function(){
        stickyNav()
    });
});

// const navLinks = document.querySelectorAll('.nav-link');
// $('.nav-link').on('click', function(){
//     // for(var i = 0; i< navLinks.length; i++){
//     //     let category = navLinks[i].innerHTML
//     //     $('.navbar-brand').innerHTML += category;
//     // }
//     // console.log(category);
// })

// document.querySelectorAll('.nav-link').forEach((link) => {
//     link.addEventListener('click', function(){
//         console.log(link.dataset.category);
//     })
// })

$('.more').hide();
$('#moreButton').on('click', function(){
    $('.more').toggle(100);
    $('#moreButton i').toggleClass('fa-arrow-circle-down').addClass('fa-arrow-circle-up');
    console.log('hi');
})

