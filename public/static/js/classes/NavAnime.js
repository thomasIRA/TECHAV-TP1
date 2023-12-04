
export default class{
    constructor(elParent) {
        this.elParent = elParent;
        this.host = location.origin;
        this.navItems = {
            home: {
                startPath: 'M50.0726 2.44118C55.7213 6.23632 62.2471 10.852 63.6856 16.8695C65.1241 22.887 61.4752 30.3063 55.8266 33.9305C50.1779 37.5547 35.7998 38.1701 28.3968 37.965C20.9939 37.7599 13.8015 37.5205 9.83688 33.8963C5.90736 30.2722 -0.588679 24.9984 0.0428504 18.6048C0.67438 12.2112 13.314 13.5203 17.2435 9.72515C24.7506 2.53894 41.1277 -3.56854 50.0726 2.44118Z',
                endPath: 'M59.8377 24.4419C58.5495 33.9091 31.7232 39.0173 27.2345 39.8214C21.6403 40.8235 12.174 37.3807 8.73896 35.176C4.13289 32.2199 1.31847 31.3182 1.00575 24.4419C0.693033 17.5655 0.588745 10.4127 4.13289 4.84943C7.67704 -0.679305 21.5013 -0.644756 27.2345 0.875646C31.1774 1.90374 40.7868 3.57168 47.7371 8C55.46 12.9206 60.3393 20.7561 59.8377 24.4419Z',
                mainColor: '#A65948',
                secondColor: '#8F9B76',
                toggle: false
            },
            about: {
                startPath: 'M58.9545 3.86682C62.2936 8.08127 62.2592 14.7829 61.7429 21.001C61.2265 27.219 50.8445 32.7052 47.5398 35.7106C44.2006 38.716 38.5206 39.0614 32.9094 38.9924C27.2982 38.9233 21.7903 38.4396 16.661 35.4343C11.5317 32.3943 -0.170244 28.6971 0.00187835 23.3081C0.174001 17.9192 5.2344 12.7375 10.3637 8.52302C15.4929 4.34312 20.6566 1.13046 26.612 0.37048C32.5675 -0.389503 55.6153 -0.313084 58.9545 3.86682Z',
                endPath: 'M59.3876 5.15853C62.6409 8.93722 60.0798 11.627 59.3876 16.6537C58.7301 21.6804 59.1873 28.5309 55.8994 32.5869C52.6115 36.6429 36.2343 41.8879 31.7698 41.9919C27.3398 42.0612 12.3924 41.7729 8.41238 37.7169C4.39772 33.6609 0.0346091 21.195 0 16.6537C0 12.0777 16.1261 12.8818 20.1408 9.10317C24.1554 5.32448 40.145 0.651847 45.2671 0.0971783C50.3893 -0.457491 56.0998 1.37985 59.3876 5.15853Z',
                toggle: false,
                mainColor: '#D99F9B',
                secondColor: '#B4C388'
            }
        }

        this.init();
    }

    async init() {
        const navHTML = await this.injectNavHTML();
        const processedNavHTML = navHTML.replaceAll('{{ path }}', this.host);
        this.elParent.innerHTML = processedNavHTML;

        this.getHTMLelements();
        this.activateLinks();
    }

    async injectNavHTML() {
        const res = await fetch('/static/layouts/templates/navigation.html');
        return res.text();
    }

    getHTMLelements() {
        this.navItems.home.element = document.querySelector('[data-nav="home"]');
        this.navItems.about.element = document.querySelector('[data-nav="about"]');
        this.navItems.home.element.link = this.navItems.home.element.querySelector('a');
        this.navItems.about.element.link = this.navItems.about.element.querySelector('a');
    }

    activateLinks() {
        this.navItems.home.element.link.addEventListener('click', (e) => {
            this.animateLink(e, this.navItems.home);
        });
        this.navItems.about.element.link.addEventListener('click', (e) => {
            this.animateLink(e, this.navItems.about)
        });
    }

    animateLink(e, navItem) {
        e.preventDefault();
        const SVG = navItem.element.querySelector('svg');
        const path = navItem.element.querySelector('path');

        const timeline = anime.timeline({
            duration: 700,
            easing: 'easeOutExpo'
        });
        timeline.add({
            targets: SVG,
            scale: .2
        })
        .add({
            targets: SVG,
            opacity: .5
        }, '-=700')
        .add({
            targets: SVG,
            rotate: navItem.toggle ? 0 : 360
        }, '-= 600')
        .add({
            targets: path,
            d: [
                { value: navItem.toggle ? navItem.startPath : navItem.endPath }
            ]
        }, '-= 200')
        .add({
            targets: SVG,
            scale: 1
        }, '-= 700')
        .add({
            targets: SVG,
            opacity: 1
        }, '-= 600')
        .add({
            targets: SVG,
            fill: navItem.toggle ? navItem.mainColor : navItem.secondColor 
        }, '-=600');

        if(!navItem.toggle) navItem.toggle = true;
        else navItem.toggle = false;
    }


}