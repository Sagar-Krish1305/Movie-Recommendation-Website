const couchbase = require('couchbase');

// Connect to Couchbase Cluster
const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: 'admin',
  password: 'password',
});

// Access a Bucket
const bucket = cluster.bucket('default');
const collection = bucket.defaultCollection();

// Example: Insert a Document
async function run() {
  try {
    await collection.insert('doc1', { name: 'John Doe', age: 30 });
    console.log('Document inserted successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}
run();
