var total_people = 6
var main_people = 1

window.addEventListener('load', function() {
    const close1 = document.getElementById('btm-close1')
    const close2 = document.getElementById('btm-close2')
    const close3 = document.getElementById('btm-close3')
    const close4 = document.getElementById('btm-close4')
    const close5 = document.getElementById('btm-close5')
    
    const close_win1 = document.getElementById("window1")
    const close_win2 = document.getElementById("window2")
    const close_win3 = document.getElementById("window3")
    const close_win4 = document.getElementById("window4")
    const close_win5 = document.getElementById("window5")
    
    const main_window_size = document.getElementById("main-wins")
    const sub_window_size = document.getElementById("sub-wins")
    const main_window_style = document.getElementById("main-user")
    const main_window_func = document.getElementById("more-func")
    const main_window_mute = document.getElementById("main-mute")


    const main_window_user = document.getElementById("main-user")
    const main_window_name = document.getElementById("main-name")
    const pin1 = document.getElementById("more-win-func1")
    const pin2 = document.getElementById("more-win-func2")
    const pin3 = document.getElementById("more-win-func3")
    const pin4 = document.getElementById("more-win-func4")
    const pin5 = document.getElementById("more-win-func5")

    close1.addEventListener('click', function(){
    let htmlstr = "<!-- " + close_win1.outerHTML + " -->"
    close_win1.outerHTML = htmlstr
    total_people = total_people - 1
    })
    close2.addEventListener('click', function(){
        let htmlstr = "<!-- " + close_win2.outerHTML + " -->"
        close_win2.outerHTML = htmlstr
        total_people = total_people - 1
    })
    close3.addEventListener('click', function(){
        let htmlstr = "<!-- " + close_win3.outerHTML + " -->"
        close_win3.outerHTML = htmlstr
        total_people = total_people - 1
    })
    close4.addEventListener('click', function(){
        let htmlstr = "<!-- " + close_win4.outerHTML + " -->"
        close_win4.outerHTML = htmlstr
        total_people = total_people - 1
    })
    close5.addEventListener('click', function(){
        let htmlstr = "<!-- " + close_win5.outerHTML + " -->"
        close_win5.outerHTML = htmlstr
        total_people = total_people - 1
    })
    
    
    pin1.addEventListener('click', function(){
        if(main_people === 1){
            win_color = document.getElementById("win-user1")
            temp_color = getComputedStyle(win_color, null).backgroundColor
            win_color.style.backgroundColor = "" + getComputedStyle(main_window_user, null).backgroundColor
            main_window_user.style.backgroundColor = temp_color
            win_name = document.getElementById("win-user1")
        }
    })
    pin2.addEventListener('click', function(){
        if(main_people === 1){
            win_color = document.getElementById("win-user2")
            temp_color = getComputedStyle(win_color, null).backgroundColor
            win_color.style.backgroundColor = "" + getComputedStyle(main_window_user, null).backgroundColor
            main_window_user.style.backgroundColor = temp_color
        }
    })
    pin3.addEventListener('click', function(){
        if(main_people === 1){
            win_color = document.getElementById("win-user3")
            temp_color = getComputedStyle(win_color, null).backgroundColor
            win_color.style.backgroundColor = "" + getComputedStyle(main_window_user, null).backgroundColor
            main_window_user.style.backgroundColor = temp_color
        }
    })
    pin4.addEventListener('click', function(){
        if(main_people === 1){
            win_color = document.getElementById("win-user4")
            temp_color = getComputedStyle(win_color, null).backgroundColor
            win_color.style.backgroundColor = "" + getComputedStyle(main_window_user, null).backgroundColor
            main_window_user.style.backgroundColor = temp_color
        }
    })
    pin5.addEventListener('click', function(){
        if(main_people === 1){
            win_color = document.getElementById("win-user5")
            temp_color = getComputedStyle(win_color, null).backgroundColor
            win_color.style.backgroundColor = "" + getComputedStyle(main_window_user, null).backgroundColor
            main_window_user.style.backgroundColor = temp_color
        }
    })




    this.window.addEventListener('mouseover', function() {
        if(total_people === 1) {
            main_window_size.style = `width: 90%;
            left: 10%;
            `
            main_window_mute.style = "left: 75%;"
            sub_window_size.style = "width: 0%"
            main_window_style.style = "width: 14%"
            main_window_func.style = "width: 10%"
        }
    })
})

