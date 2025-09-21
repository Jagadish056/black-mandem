if (!Array.prototype.unique) {
    Array.prototype.unique = function() {
        return [...new Set(this)]
    }
}

if (!Array.prototype.pluck) {
    Array.prototype.pluck = function(field) {
        return this.map(obj => obj[field])
    }
}

if (!Array.prototype.sortByDate) {
    Array.prototype.sortByDate = function(field) {
        return this.sort((a, b) => new Date(b[field]) - new Date(a[field]))
    }
}

document.addEventListener('alpine:init', () => {

    Alpine.store('dev', window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

    Alpine.store('api', {
        baseUrl:"",
        data:{},
        async init () {
            await axios.get(this.baseUrl + "/gtav.json")
            .then(res => res.data.data)
            .then(res => {
                res?.history.sortByDate('timestamp')
                this.data = res ?? {}
            })
            .catch(err => console.error('Failed to load:', err))
        }
    } )

    Alpine.data('hero', () => ({
        loading: true,
        activeWallpaper:0,
        init() {
            

            setInterval(() => {

                if (!this.loading) {
                    this.loading = true
                    this.activeWallpaper = 0
                } else {
                    if (this.activeWallpaper >= (this.$store.api.data.wallpaper?.length - 1)) {
                        this.loading = false
                    } else {
                        this.activeWallpaper++
                    }
                }
            }, 8000)
        },

        toggle() {
            this.open = ! this.open
        }
    }))

    Alpine.data('app', () => ({
        init() {
            this.$store.api.baseUrl = Alpine.store('dev') ? "" : "https://cdn.jsdelivr.net/gh/Jagadish056/black-mandem@c336eae"
            this.$store.api.init()

            // this.$nextTick(() => {
            //     console.log(this.$store.api.data)
            // });
        },

        
    }))

})