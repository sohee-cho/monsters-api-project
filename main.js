window.addEventListener('load', () => {
    const ul = document.getElementById('monsters')
    const dataUrl = 'https://jsonplaceholder.typicode.com/users'
    console.log(dataUrl)
    let monsters = []

    function createNode(element) {
        return document.createElement(element)
    }

    function append(parent, el) {
        parent.appendChild(el)
    }

    function fetchMonsters() {
        fetch(dataUrl)
            // transform data into json
            .then((res) => res.json())
            .then((users) => {
                monsters = users
                console.log(monsters)
                // Create and append the lis to the ul
                return monsters.map((monster) => {
                    console.log(monster)
                    let li = createNode('li')
                    let img = createNode('img')
                    let div = createNode('div')
                    img.addEventListener('load', function () {
                        console.log(`Image has completed loading!`)
                        div.innerHTML = `${monster.name} ${monster.email}<br/> 
${monster.address.street} ${monster.address.suite}<br/>
${monster.address.city} ${monster.address.zipcode}`
                        append(li, img)
                        append(li, div)
                        append(ul, li)
                    })
                    const imageUrl = `https://robohash.org/${monster.id}?set=set3&size=300x300`
                    img.src = `${imageUrl}`
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fetchMonsters()


    function searchMonsters() {
        let input = document.getElementById('search')
        let filter = input.value.toLowerCase()
        let ul = document.getElementById('monsters')
        let li = ul.getElementsByTagName('li')
        for (let i = 0; i < li.length; i++) {
            let div = li[i].getElementsByTagName('div')[0]
            let txtValue = div.textContent || div.innerText
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                li[i].style.display = ''
                input.addEventListener('keydown', function (e) {
                    const chord = e.keyCode || e.which
                    if (chord === 8) {
                        e.preventDefault()
                        e.currentTarget.value = ''
                        window.location.reload()
                    }
                })
            } else {
                li[i].style.display = 'none'
            }
        }
    }

    const input = document.getElementById('search')

    input.addEventListener('change', searchMonsters)
})
