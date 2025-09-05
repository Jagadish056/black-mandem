document.addEventListener('alpine:init', () => {

    Alpine.store('gtav', {
        data: {},

        init() {
            this.getData()
            .then(res => this.data = res)
            .catch(err => console.error('Failed to load GTAV data:', err))
        },

        async getData() {
            return await fetch("/gtav.json").then(res => console.log(res)).then(res => res.data)
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