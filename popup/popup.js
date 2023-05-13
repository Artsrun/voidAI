let db;

let request = indexedDB.open('myDatabase', 1);

request.onsuccess = function(e) {
  db = e.target.result;

  let tx = db.transaction(['myDataStore'], 'readonly');
  let store = tx.objectStore('myDataStore');
  let index = store.index('name');
  
  let cursorRequest = index.openCursor();

  cursorRequest.onsuccess = function(e) {
    let cursor = e.target.result;
    if (cursor) {
      // Here, you'd decide how to display the suggestions based on your data.
      // For simplicity, we'll just append the whole data item to the page.
      let templateDiv = document.getElementById('templates');
      let dataItem = document.createElement('p');
      dataItem.textContent = JSON.stringify(cursor.value);
      templateDiv.appendChild(dataItem);
      
      cursor.continue();
    }
  };
};

request.onerror = function(e) {
    console.error('Error opening db', e);
  };
