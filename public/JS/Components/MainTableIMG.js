class MainTableIMG {
    render(status) {
        switch (status) {
            case 'New':
                return '<img class="main-table-img" src="../assets/dashboard/new.png">'
            case 'Ongoing':
                return  '<img class="main-table-img" src="../assets/dashboard/processing.png">'
            case 'Finished':
                return  '<img class="main-table-img" src="../assets/dashboard/completed.png">'
        }
    }
}

export { MainTableIMG }