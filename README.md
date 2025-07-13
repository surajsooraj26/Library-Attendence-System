<h1>Library Attendance System</h1>

<p>The Library Attendance System is a web-based application built using the MERN stack (MongoDB, Express, React, Node.js). It streamlines the management and tracking of attendance for students and faculty in the college library. The system allows users to record their entry and exit either by manually entering their unique IDs or by scanning a barcode for a seamless experience.

A built-in timer ensures accurate tracking of time spent in the library, automatically marking an exit if a user forgets to log out, while also highlighting instances where the exit was system-generated. This ensures precise attendance records and minimizes manual intervention, making the system efficient and user-friendly.

</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#technologies-used">Technologies Used</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#license">License</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
  <li>Admin registration and login with JWT authentication</li>
  <li>Attendance logging system</li>
  <li>Admin dashboard to view and manage user attendance</li>
  <li>Real-time updates with React and Express</li>
</ul>

<h2 id="technologies-used">Technologies Used</h2>
<ul>
  <li><strong>Frontend:</strong> React.js, HTML, CSS, JavaScript</li>
  <li><strong>Backend:</strong> Node.js, Express.js</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Authentication:</strong> JWT (JSON Web Token)</li>
</ul>

<h2 id="installation">Installation</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone git@github.com:surajsooraj26/Library-Attendence-System.git
cd Library-Attendence-System
    </code></pre>
  </li>
  
  <li>Install dependencies for both the backend and frontend:
    <ul>
      <li><strong>Backend:</strong>
        <pre><code>cd backend
npm install
        </code></pre>
      </li>
      <li><strong>Frontend:</strong>
        <pre><code>cd frontend
npm install
        </code></pre>
      </li>
    </ul>
  </li>

  <li>Create a <code>.env</code> file in the backend folder and add your PORT, MongoDB URI and JWT secret:
    <pre><code>
PORT=3500 //any available port
DB_URL="your_mongodb_uri"
JWT_SECRET=your_jwt_secret
    </code></pre>
  </li>
<li>Setup admin credentials:
  <pre><code> 
  1. Navigate to <code>backend/routes/adminRoutes.js</code>.
  2. Uncomment line 8: 
     <code>router.post("/register", adminController.adminRegistration);</code>
  3. Edit <code>backend/admin-setup.js</code> and update the following:
     <code>{ username: "Admin username", password: "Admin password" }</code>
  </code></pre>
</li>

  <li>Start the backend server:
    <pre><code>cd backend
npm run dev
    </code></pre>
  </li>
  <li>Create the admin:
  <pre><code>
  1. Open a new terminal without closing the backend server.
  2. Navigate to the backend directory:
     cd backend
  3. Run the following command to register the admin:
     npm run adminregister
  </code></pre>
</li>

  <li>Start the frontend server:
    <pre><code>cd frontend
npm run dev
    </code></pre>
  </li>
</ol>

<h2 id="usage">Usage</h2>
<ol>
  <li>Navigate to the frontend (default is <code>http://localhost:5173</code>).</li>
  <li>Log in with the username and password set up in <strong>Step 4.3</strong>.</li>

  <li>Admin can view attendance records and manage users via the dashboard.</li>
</ol>


<h2 id="license">License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>
