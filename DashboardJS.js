//------------------------------------------------------ Hardcoded data---------------------------------------------------------
const currentUser = {
    id: 1,
    name: "Sarah",
    email: "sarah@lithub.com",
    memberSince: "2024"
};

let wishlistBooks = [
    {
        id: "book_001",
        title: "The Alchemist",
        author: "Paulo Coelho",
        cover: "Img/B-TheAlchemist.jpg",
        savedDate: "2026-20-03",
        pages: 336
    },
    {
        id: "book_002",
        title: "The Hunger Games",
        author: "Suzanne Collins",
        cover: "Img/B-TheHungerGames.jpg",
        savedDate: "2026-20-03",
        pages: 496
    },
    {
        id: "book_003",
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "Img/B-TheMidnightLib.jpg",
        savedDate: "2026-20-03",
        pages: 416
    },
    {
        id: "book_004",
        title: "The Butterfly's Burden",
        author: "Mahmoud Darwish",
        cover: "Img/B-TheButterflyBurden.jpg",
        savedDate: "2026-20-03",
        pages: 528
    },
    {
        id: "book_005",
        title: "Dear Debbie",
        author: "Freida McFadden",
        cover: "Img/B-DearDebbie.jpg",
        savedDate: "2026-20-03",
        pages: 336
    }
];

let readBooks = [
    {
        id: "book_006",
        title: "Now I surrender",
        author: "Alvaro Enrigue",
        cover: "Img/B-NowISurrender.jpg",
        dateRead: "2026-20-03",
        rating: 5,
        pages: 896
    },
    {
        id: "book_007",
        title: "Eleanore Of Avignon",
        author: "Elizabeth DeLozier",
        cover: "Img/B-EleanoreOfAvignon.jpg",
        dateRead: "2026-20-03",
        rating: 4,
        pages: 180
    },
    {
        id: "book_008",
        title: "Vigil",
        author: "George Saunders",
        cover: "Img/B-Vigil.jpg",
        dateRead: "2026-20-03",
        rating: 5,
        pages: 328
    },
    {
        id: "book_009",
        title: "One & Only",
        author: "Maurene Goo",
        cover: "Img/B-One&Only.jpg",
        dateRead: "2026-20-03",
        rating: 4,
        pages: 304
    }
];
//--------------------------------------------------------------------------------------------------------------

// ---------------------DISPLAY FUNCTIONS

// Displays user name
document.getElementById('userName').textContent = currentUser.name;

// Update stats
function updateStats() {
    document.getElementById('wishlistCount').textContent = wishlistBooks.length;
    document.getElementById('readCount').textContent = readBooks.length;

    let totalPagesRead = 0;
    for (const book of readBooks) {
        totalPagesRead = totalPagesRead + (book.pages || 0);
    }
    document.getElementById('totalPages').textContent = totalPagesRead;
}

// Shows stars
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Display wishlist books
function displayWishlist() {
    const wish = document.getElementById('wishlistGrid');

    if (wishlistBooks.length === 0) {
        wish.innerHTML = `
                    <div class="empty-grid">
                        <h3>Your wishlist is empty</h3>
                        <p>Start adding books from the <a href="books.html">Books page </a>!</p>
                    </div>
                `;
        return;
    }

    let html = '';
    for (const book of wishlistBooks) {
        html += `
                    <div class="book-card" data-book-id="${book.id}">
                        <img src="${book.cover}" alt="${book.title}" class="book-cover">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">by ${book.author}</p>
                            <p class="book-date">Added: ${book.savedDate}</p>
                            <div class="book-actions">
                                <button class="btn-read" onclick="markAsRead('${book.id}')">
                                    <i class="fas fa-check"></i> Mark as Read
                                </button>
                                <button class="btn-remove" onclick="removeFromWishlist('${book.id}')">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    };

    wish.innerHTML = html;
}

// Display read books
function displayReadBooks() {
    const read = document.getElementById('readGrid');

    if (readBooks.length === 0) {
        read.innerHTML = `
                    <div class="empty-grid">
                        <h3>No books marked as read yet</h3>
                        <p>Mark books as read from your wishlist!</p>
                    </div>
                `;
        return;
    }

    let html = '';
    for (const book of readBooks) {
        html += `
                    <div class="book-card" data-book-id="${book.id}">
                        <img src="${book.cover}" alt="${book.title}" class="book-cover">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">by ${book.author}</p>
                            <div class="book-rating">${getStarRating(book.rating)}</div>
                            <p class="book-date">Read: ${book.dateRead}</p>
                            <div class="book-actions">
                                <button class="btn-rate" onclick="rateBook('${book.id}')">
                                    <i class="fas fa-star"></i> Rate
                                </button>
                                <button class="btn-remove" onclick="removeFromRead('${book.id}')">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    };

    read.innerHTML = html;
}


// -------------------------------ACTION FUNCTIONS

// Mark a book as read 
function markAsRead(bookId) {
    const bookIndex = wishlistBooks.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        const book = wishlistBooks[bookIndex];

        const readBook = {
            ...book,
            dateRead: new Date().toISOString().split('T')[0],
            rating: 0
        };
        delete readBook.savedDate;
        readBooks.unshift(readBook);

        wishlistBooks.splice(bookIndex, 1);

        displayWishlist();
        displayReadBooks();
        updateStats();

        showToast(`"${book.title}" moved to Already Read!`);
    }
}

// Remove from wishlist
function removeFromWishlist(bookId) {
    const bookIndex = wishlistBooks.findIndex(book => book.id === bookId);

    var book;
    if (bookIndex !== -1) {
        book = wishlistBooks[bookIndex];
        wishlistBooks.splice(bookIndex, 1);
    }

    displayWishlist();
    updateStats();
    showToast(`"${book.title}" removed from wishlist`);
}

// Remove from read list
function removeFromRead(bookId) {
    const bookIndex = readBooks.findIndex(book => book.id === bookId);
    var book;
    if (bookIndex !== -1) {
        book = readBooks[bookIndex];
        readBooks.splice(bookIndex, 1);
    }

    displayReadBooks();
    updateStats();
    showToast(`"${book.title}" removed from reading list`);
}

// Rate the book prompt
function rateBook(bookId) {
    const book = readBooks.find(b => b.id === bookId);
    const rating = prompt(`Rate "${book.title}" (1 to 5 stars):`);

    if (rating && rating >= 1 && rating <= 5) {
        book.rating = parseInt(rating);
        displayReadBooks();
        showToast(`Rated "${book.title}" ${rating} stars!`, 'success');
    } else if (rating) {
        showToast('Please enter a rating between 1 and 5', 'error');
    }
}


// ------------------------EXPORT FUNCTIONS

// Export as TXT
function exportAsTXT() {
    let content = "LIT HUB READING LISTS\n";
    content += "=====================\n\n";
    content += `User: ${currentUser.name} (${currentUser.email})\n`;
    content += `Generated on ${new Date().toLocaleString()}\n\n`;

    content += `Stats: ${wishlistBooks.length} in wishlist, ${readBooks.length} read, ${readBooks.reduce((t, b) => t + (b.pages || 0), 0)} pages total\n-----\n\n`;

    content += "WISHLIST\n";
    content += "--------\n";
    if (wishlistBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (let i = 0; i < wishlistBooks.length; i++) {
            const book = wishlistBooks[i];
            content += `${i + 1}. ${book.title} by ${book.author} (Added: ${book.savedDate})\n`;
        }
    }

    content += "\nALREADY READ\n";
    content += "------------\n";
    if (readBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (let i = 0; i < readBooks.length; i++) {
            const book = readBooks[i];
            const rating = book.rating ? `${book.rating}⭐` : 'Not rated';
            content += `${i + 1}. ${book.title} by ${book.author} (Read: ${book.dateRead},  Rating: ${rating})\n`;
        }


    }

    downloadFile(content, 'My_LitHub_Lists.txt', 'text/plain');
    showToast('Exported as TXT!');
}

// Export as CSV
function exportAsCSV() {
    let content = "TYPE,TITLE,AUTHOR,DATE ADDED/READ,RATING,NO. OF PAGES\n\n";

    for (let i = 0; i < wishlistBooks.length; i++) {
        const book = wishlistBooks[i];
        content += `Wishlist,"${book.title}","${book.author}",${book.savedDate},,${book.pages || ''}\n`;
    }
    content += `\n`;
    for (let i = 0; i < readBooks.length; i++) {
        const book = readBooks[i];
        content += `Already Read,"${book.title}","${book.author}",${book.dateRead},${book.rating || ''},${book.pages || ''}\n`;
    }

    downloadFile(content, 'My_LitHub_Lists.csv', 'text/csv');
    showToast('Exported as CSV!');
}

// Helper: Download file
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}


// ------------------------UI FUNCTIONS

//Switching between tabs
function switchTab(tab) {
    const wishlistTab = document.getElementById('wishlistTab');
    const readTab = document.getElementById('readTab');
    const tabs = document.querySelectorAll('.tab-btn');

    if (tab === 'wishlist') {
        wishlistTab.style.display = 'block';
        readTab.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        wishlistTab.style.display = 'none';
        readTab.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


//Initializing the dashboard
function initialize() {
    updateStats();
    displayWishlist();
    displayReadBooks();
}

initialize();
