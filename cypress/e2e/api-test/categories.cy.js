describe('Automation API Testing - Platzi Fake API Categories', () => {
  const baseUrl = 'https://api.escuelajs.co/api/v1/categories';
  let createdCategoryId; // Variabel untuk menyimpan ID kategori yang akan di-test (CRUD)

  // 1. GET Semua Kategori
  it('1. GET All Categories - Should return 200 and an array', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  // 2. GET Kategori dengan Limit (Pagination)
  it('2. GET Categories with Pagination - Should return 200 and limited items', () => {
    cy.request('GET', `${baseUrl}?limit=3&offset=0`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(3);
    });
  });

  // 3. GET Kategori Spesifik (ID = 1)
  it('3. GET Single Category - Should return 200 and correct object properties', () => {
    cy.request('GET', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('image');
    });
  });

  // 4. GET Kategori dengan ID yang tidak valid
  it('4. GET Invalid Category - Should return 400 Bad Request', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false // Agar test tidak gagal saat menerima error status
    }).then((response) => {
      expect(response.status).to.eq(400); // Platzi API return 400 untuk ID tidak ditemukan
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

  // 5. GET Products berdasarkan Category ID
  it('5. GET Products by Category ID - Should return 200 and an array of products', () => {
    cy.request('GET', `${baseUrl}/1/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  // 6. POST Buat Kategori Baru (Valid)
  it('6. POST Create New Category - Should return 201 and created data', () => {
    const payload = {
      name: 'Cypress Test Category',
      image: 'https://placeimg.com/640/480/any'
    };
    cy.request('POST', baseUrl, payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', payload.name);
      expect(response.body).to.have.property('id');
      
      createdCategoryId = response.body.id; // Simpan ID untuk test PUT dan DELETE selanjutnya
    });
  });

  // 7. POST Buat Kategori (Data Tidak Lengkap - Tanpa image)
  it('7. POST Create Category Missing Data - Should return 400', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: { name: 'Invalid Category' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.be.an('array');
    });
  });

  // 8. PUT Update Kategori yang baru dibuat
  it('8. PUT Update Category - Should return 200 and updated data', () => {
    const updatePayload = {
      name: 'Cypress Updated Category'
    };
    cy.request('PUT', `${baseUrl}/${createdCategoryId}`, updatePayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', updatePayload.name);
      expect(response.body).to.have.property('id', createdCategoryId);
    });
  });

  // 9. GET Verifikasi Update Kategori
  it('9. GET Verify Updated Category - Should match the updated name', () => {
    cy.request('GET', `${baseUrl}/${createdCategoryId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Cypress Updated Category');
    });
  });

  // 10. PUT Update Kategori dengan ID tidak valid
  it('10. PUT Update Invalid Category ID - Should return 400', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/999999`,
      body: { name: 'Error Name' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

// 11. DELETE Kategori yang dibuat pada Test 6
    it('11. DELETE Category - Should return 200 and string true', () => {
        cy.request('DELETE', `${baseUrl}/${createdCategoryId}`).then((response) => {
        expect(response.status).to.eq(200);
        // Ubah asersi menjadi pengecekan string
        expect(response.body.toString()).to.eq('true'); 
        });
    });

  // 12. DELETE Kategori yang sudah dihapus/tidak ada
  it('12. DELETE Non-existent Category - Should return 400', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${createdCategoryId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq('EntityNotFoundError');
    });
  });

});