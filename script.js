document.addEventListener('alpine:init', () => {

    Alpine.store('dev', window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

    Alpine.store('gtav', {
        data: {},

        init() {
            this.getData()
            .then(res => {
                res.blackMandem?.history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                this.data = res
            })
            .catch(err => console.error('Failed to load:', err))
        },

        async getData() {
            return await axios.get(
                Alpine.store('dev') ? "/gtav.json" : "https://cdn.jsdelivr.net/gh/Jagadish056/black-mandem@main/gtav.json"
            ).then(res => res.data)
        }
    })

    Alpine.data('hero', () => ({
        loading: true,
        backgroundImages: [
            "./images/hood.jpeg",
            "./images/1.png",
            "./images/2.png",
            "./images/3.png"
        ],
        activeBackgroundImage:0,
        init() {
            

            setInterval(() => {

                if (!this.loading) {
                    this.loading = true
                    this.activeBackgroundImage = 0
                } else {
                    if (this.activeBackgroundImage >= (this.backgroundImages.length - 1)) {
                        this.loading = false
                    } else {
                        this.activeBackgroundImage++
                    }
                }
            }, 8000)
        },

        toggle() {
            this.open = ! this.open
        }
    }))
})