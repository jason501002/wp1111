window.addEventListener('load', function() {


    closes = document.getElementsByClassName("btm-close")
    Array.prototype.forEach.call(closes, function(items){
        items.addEventListener('click', function(){
            items.parentElement.remove()
            main_people = document.getElementById("main-wins").childElementCount
            total_people = document.getElementsByClassName("win").length


            if(total_people === 1 && main_people === 1) {
                main = document.getElementById("main-wins")
                sub = document.getElementById("sub-wins")
                main.style = `
                    width: 95%;
                `
                sub.style.display = "none"
            }
            if(total_people === 1 && main_people === 0){
                //console.log("test")
                temp_main_win = document.getElementById("main-wins")
                temp_sub_user = document.getElementById("window0")
                
                temp_main_win.appendChild(temp_sub_user)
                // console.log(temp_main_win, temp_sub_user)
                main = document.getElementById("main-wins")
                sub = document.getElementById("sub-wins")
                main.style = `
                    height: 85%;
                    width: 95%;
                `
                main.children[0].style = `
                    height: 95%;
                    width: 95%;
                `
                sub.style.display = "none"
            }
        })
    })







    pin = document.getElementsByClassName("win-func")
    Array.prototype.forEach.call(pin, function(items){

        items.addEventListener('click', function(){
            main_people = document.getElementById("main-wins").childElementCount
            total_people = document.getElementsByClassName("win").length

            if(items === pin[0] && main_people === 1){
                temp_main_win = document.getElementById("main-wins")
                temp_main_user = temp_main_win.children[0]
                temp_sub_win = pin[1].parentElement.parentElement
                // temp_sub_win = pin[1].parentElement.parentElement

                temp_main_win.children[0].remove()
                temp_sub_win.appendChild(temp_main_user)
                // console.log("temp_sub_win")
                // console.log(temp_sub_win)
                
                // console.log(getComputedStyle(temp_sub_win, null).width)
                temp_sub_win.style.width = "90%"
                    
                temp_main_win.style =`
                    width: 0%;
                `
                Array.prototype.forEach.call(pin, function(win_items) {
                    win_items.parentElement.style = `
                        height: 40%;
                        width: 30%;
                    `
                    // console.log(items);
                });
            }
            else if(items !== pin[0] && main_people === 1){
                temp_main_win = document.getElementById("main-wins")
                temp_main_user = temp_main_win.children[0]
                temp_sub_user = items.parentElement
                temp_sub_win = items.parentElement.parentElement
                // console.log("temp_main_user")
                // console.log(temp_main_user)
                // temp_main_win.children[0].remove()

                temp_main_user.style = `
                    height: 30%;
                    width: 45%;
                `
                temp_sub_user.style = `
                    height: 95%;
                    width: 95%;
                `
                temp_main_win.removeChild(temp_main_user)               
                items.parentElement.remove()
                temp_main_win.appendChild(temp_sub_user)
                temp_sub_win.appendChild(temp_main_user)
                
            }
            else if(main_people === 0){
                //console.log("tests1")
                temp_main_win = document.getElementById("main-wins")
                temp_sub_win = items.parentElement.parentElement
                temp_sub_user = items.parentElement
                // console.log("temp_sub_user")
                // console.log(temp_sub_user)
                temp_sub_win.removeChild(temp_sub_user)
                temp_main_win.appendChild(temp_sub_user)
                // // items.parentElement.remove()
                
                main_people = 1
                
                temp_sub_win.style.width = "30%"  
                temp_main_win.style =`
                    width: 65%;
                `
                fix = document.getElementsByClassName("win")
                // console.log(fix[0])
                for(i = 0; i < fix.length; i++) {
                    fix[i].style = `
                        height: 30%;
                        width: 45%;
                    `
                }
                main = document.getElementById("main-wins")
                main.children[0].style = `
                    height: 95%;
                    width: 95%;
                `
            }
        })
    })

})