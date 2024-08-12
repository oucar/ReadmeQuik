import { Category, Block, BlockType } from "~/types";
import dedent from "ts-dedent";

export const ProjectBlockList: Block[] = [
  {
    name: "Title and Description",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    # My Awesome Project
  
    This project is a web application that helps users track their daily tasks and increase productivity.
    `,
  },
  {
    name: "Run Locally",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Run Locally
    
    Follow these steps to set up and run the project locally on your machine.
    
    ### Prerequisites
    Make sure you have the following software installed on your machine:
    - [Node.js](https://nodejs.org/) (v14 or later)
    - [npm](https://www.npmjs.com/) (v6 or later)
    
    ### Steps
    
    1. **Clone the project**
    
    \`\`\`bash
      git clone https://link-to-project
    \`\`\`
    
    2. **Navigate to the project directory**
    
    \`\`\`bash
      cd my-project
    \`\`\`
    
    3. **Install dependencies**
    
    \`\`\`bash
      npm install
    \`\`\`
    
    4. **Set up environment variables**
    
    Create a \`.env.local\` file in the project root and add the necessary environment variables. Refer to the \`.env.example\` file for the required variables.
    
    5. **Run linting to check for code issues**
    
    \`\`\`bash
      npm run lint
    \`\`\`
    
    6. **Build the project**
    
    \`\`\`bash
      npm run build
    \`\`\`
    
    7. **Start the development server**
    
    \`\`\`bash
      npm run dev
    \`\`\`
    
    Your application should now be running at [http://localhost:3000](http://localhost:3000).
  `,
  },
  {
    name: "API Reference",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    
    ## API Reference
  
    This section provides details about the API endpoints available in the project.

    ### Get All Items

    Retrieves a list of all items.

    \`\`\`http
    GET /api/items
    \`\`\`

    **Query Parameters:**

    | Parameter | Type     | Description                        |
    | :-------- | :------- | :--------------------------------- |
    | \`api_key\` | \`string\` | **Required**. Your API key          |
    | \`limit\`   | \`number\` | Optional. Limit the number of items |
    | \`offset\`  | \`number\` | Optional. Offset for pagination     |

    **Response:**

    Returns an array of items.

    \`\`\`json
    [
      {
        "id": "1",
        "name": "Item 1",
        "description": "Description of item 1",
        "price": 10.99
      },
      {
        "id": "2",
        "name": "Item 2",
        "description": "Description of item 2",
        "price": 12.99
      }
    ]
    \`\`\`

    ### Get Item by ID

    Retrieves details of a specific item by its ID.

    \`\`\`http
    GET /api/items/\${id}
    \`\`\`

    **Path Parameters:**

    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | \`id\`      | \`string\` | **Required**. ID of the item to fetch |

    **Response:**

    Returns the item object.

    \`\`\`json
    {
      "id": "1",
      "name": "Item 1",
      "description": "Description of item 1",
      "price": 10.99
    }
    \`\`\`

    ### Create a New Item

    Creates a new item in the inventory.

    \`\`\`http
    POST /api/items
    \`\`\`

    **Body Parameters:**

    | Parameter   | Type     | Description                        |
    | :---------- | :------- | :--------------------------------- |
    | \`name\`      | \`string\` | **Required**. Name of the item        |
    | \`description\` | \`string\` | **Required**. Description of the item |
    | \`price\`     | \`number\` | **Required**. Price of the item       |

    **Response:**

    Returns the newly created item object.

    \`\`\`json
    {
      "id": "3",
      "name": "Item 3",
      "description": "Description of item 3",
      "price": 15.99
    }
    \`\`\`

    ### Update an Item

    Updates an existing item by its ID.

    \`\`\`http
    PUT /api/items/\${id}
    \`\`\`

    **Path Parameters:**

    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | \`id\`      | \`string\` | **Required**. ID of the item to update |

    **Body Parameters:**

    | Parameter   | Type     | Description                        |
    | :---------- | :------- | :--------------------------------- |
    | \`name\`      | \`string\` | Optional. Name of the item           |
    | \`description\` | \`string\` | Optional. Description of the item    |
    | \`price\`     | \`number\` | Optional. Price of the item          |

    **Response:**

    Returns the updated item object.

    \`\`\`json
    {
      "id": "1",
      "name": "Updated Item 1",
      "description": "Updated description of item 1",
      "price": 11.99
    }
    \`\`\`

    ### Delete an Item

    Deletes an item by its ID.

    \`\`\`http
    DELETE /api/items/\${id}
    \`\`\`

    **Path Parameters:**

    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | \`id\`      | \`string\` | **Required**. ID of the item to delete |

    **Response:**

    Returns a success message.

    \`\`\`json
    {
      "message": "Item deleted successfully"
    }
    \`\`\`
    `,
  },
  {
    name: "Running Tests",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`

    ## Running Tests

    To run tests, run the following command:

    \`\`\`bash
      npm run test
    \`\`\`

    ### Using React Testing Library

    This project uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing React components. Here is an example of how to write a test for a component.

    First, ensure you have the necessary dependencies installed:

    \`\`\`bash
      npm install --save-dev @testing-library/react @testing-library/jest-dom
    \`\`\`

    Then, create a test file for your component. For example, if you have a \`Button\` component, create a \`Button.test.js\` file in the same directory as the component.

    \`\`\`javascript
    // Button.test.js
    import React from 'react';
    import { render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom/extend-expect';
    import Button from './Button';

    test('renders the button with the correct text', () => {
      render(<Button>Click me</Button>);
      const buttonElement = screen.getByText(/click me/i);
      expect(buttonElement).toBeInTheDocument();
    });
    \`\`\`

    To run this test, simply use the following command:

    \`\`\`bash
      npm run test
    \`\`\`

    This will start the test runner in interactive watch mode. You can then see the test results in your terminal.
  `,
  },
  {
    name: "Authors",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
      
    ## Authors
  
    - [@oucar](https://github.com/oucar/ReadmeQuik)  
    - [@johndoe](https://github.com/johndoe) - Contributed to the initial setup and project architecture.
    - [@janedoe](https://github.com/janedoe) - Focused on the UI/UX design and frontend development.
    `,
  },
  {
    name: "Badges",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Badges
      
    Showcase the key features or technologies used in your project with badges:
      
    ![React](https://img.shields.io/badge/React-v18.2.0-blue)
    ![Next.js](https://img.shields.io/badge/Next.js-v14.2.5-black)
    ![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
    `,
  },
  {
    name: "Contributing",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Contributing
  
    Contributions are always welcome!
  
    If you'd like to contribute, please follow these steps:
  
    1. **Fork the repository** to your GitHub account.
    2. **Clone your fork** to your local machine:

    \`\`\`bash
    git clone https://github.com/your-username/your-repo.git
    \`\`\`

    3. **Create a new branch** for your feature or bugfix:

    \`\`\`bash
    git checkout -b feature/your-feature-name
    \`\`\`

    4. **Make your changes** to the codebase.

    5. **Commit your changes** and push them to your fork:

    \`\`\`bash
    git add .
    git commit -m 'Add some feature'
    git push origin feature/your-feature-name
    \`\`\`

    6. **Open a Pull Request** on the main repository.

    See \`contributing.md\` for more detailed guidelines.

    Please adhere to this project's \`code of conduct\`.
    `,
  },
  {
    name: "Demo",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Demo

    Check out the live demo below:

    ![Demo GIF](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG80bnFuZWkwaWRxeGlwcHVqazFzM2Z0bXcwcndxN3c3b3VwbnVnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d9O5lPyufbSfZzC1pq/giphy.gif)

    Or watch the walkthrough on [YouTube](https://www.youtube.com/watch?v=demo-video-url).

    ### Quick Walkthrough

    1. **Home Page:** Displays the main features of the app.
    2. **User Dashboard:** Allows users to manage their tasks.
    3. **Settings:** Customize your user experience.
    `,
  },
  {
    name: "Deployment",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Deployment

    To deploy this project run

    \`\`\`bash
      npm run deploy
    \`\`\`

`,
  },
  {
    name: "Environment Variables",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Environment Variables

    To run this project, you will need to add the following environment variables to your \`.env\` file:

    \`API_KEY\`: Your unique API key for accessing the external service.

    \`ANOTHER_API_KEY\`: Another key used for a different external service.

    ### Example .env file

    \`\`\`bash
    API_KEY=your-api-key-here
    ANOTHER_API_KEY=your-another-api-key-here
    \`\`\`

    Make sure to keep your \`.env\` file secure and never commit it to version control.
    `,
  },
  {
    name: "FAQ",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## FAQ

    #### What do I do if I accidentally commit to the main branch?

    First, don't panic. Then, quietly \`git checkout -b new-branch\` and act like nothing happened. We’ve all been there.

    #### How do I undo my last commit?

    Ah, the famous \`git reset --hard HEAD~1\`. Use it wisely, young padawan. But remember, with great power comes great responsibility.

    #### Help! I did \`git push --force\` and now everything's on fire!

    Congratulations, you've unlocked the "Git Firefighter" badge! Now, calmly review what went wrong, restore from backup, and maybe reconsider that force push next time.
    `,
  },
  {
    name: "Features",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Features

    - **Light/Dark Mode Toggle:** Seamlessly switch between light and dark themes based on your preference.
    - **Live Previews:** Instantly see the changes you make as you code, without needing to refresh.
    - **Fullscreen Mode:** Maximize your workspace with a distraction-free fullscreen mode.
    - **Cross-Platform Compatibility:** Enjoy the same experience on Windows, macOS, and Linux.
    `,
  },
  {
    name: "Feedback",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Feedback

    If you have any feedback, please reach out to us at hello@ucaronur.com.
    `,
  },
  {
    name: "Installation",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Installation 
    
    Follow these steps to install and set up the project:

    1. **Clone the repository:**

    \`\`\`bash
    git clone https://github.com/your-username/my-project.git
    \`\`\`

    2. **Navigate to the project directory:**

    \`\`\`bash
    cd my-project
    \`\`\`

    3. **Install dependencies with npm:**

    \`\`\`bash
    npm install
    \`\`\`

    4. **Start the development server:**

    \`\`\`bash
    npm run dev
    \`\`\`

    The application should now be running at [http://localhost:3000](http://localhost:3000).
    `,
  },
  {
    name: "License",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## License

    This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

    You are free to use, modify, and distribute this software under the terms of the MIT License.
    `,
  },
  {
    name: "Logo",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Logo
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="200"/>
    `,
  },
  {
    name: "Roadmap",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Roadmap

    - **Additional Browser Support:** Expand compatibility to include older versions of popular browsers and ensure smooth performance across all devices.
    - **Add More Integrations:** Introduce integrations with additional third-party services and tools to enhance the functionality and user experience.
    - **Improved Documentation:** Expand and refine the project documentation to include more comprehensive guides and examples.
    - **Performance Optimization:** Focus on reducing load times and improving the overall efficiency of the application.
    - **User Feedback System:** Implement a feedback system to gather user input and prioritize features based on community needs.
    `
  },
  {
    name: "Screenshots",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Screenshots
    
    - A screenshot displaying feature 1

    ![App Screenshot 1](https://via.placeholder.com/468x300.png?text=App+Screenshot)

    - A screenshot displaying feature 2

    ![App Screenshot 2](https://via.placeholder.com/468x300.png?text=App+Screenshot)
    `,
  },
  {
    name: "Support",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Support

    For support, feel free to reach out via email at [support@yourdomain.com](mailto:support@yourdomain.com) or join our [Slack channel](https://join.slack.com/your-slack-channel-link).

    We're here to help with any questions or issues you may encounter.
    `
  },
  {
    name: "Tech Stack",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Tech Stack

    **Client:** React, Redux, Tailwind CSS, TypeScript

    **Server:** Node, Express, MongoDB

    **DevOps:** Docker, Kubernetes, Jenkins
    `
  },
  {
    name: "Appendix",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Appendix

    Additional information or resources related to the project can be found here. This might include links to documentation, tutorials, or any other relevant materials.
    `
  },
  {
    name: "Usage/Examples",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Usage/Examples

    First, install the package using npm:

    \`\`\`bash
    npm install my-project
    \`\`\`

    Then, you can import and use the component in your React application:

    \`\`\`javascript
    import Component from 'my-project';

    function App() {
      return <Component />;
    }
    \`\`\`

    You can also pass props to the component for customization:

    \`\`\`javascript
    import Component from 'my-project';

    function App() {
      return <Component propName="value" />;
    }
    \`\`\`

    For more details on available props and usage examples, visit the Component API Documentation.
    `
  },
  {
    name: "Used By",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Used By

    This project is trusted and utilized by the following companies:

    - **TechCorp** - Innovating the future with cutting-edge technology solutions.
    - **DataSolutions** - Empowering businesses with data-driven insights.
    - **Webify** - Revolutionizing the web development landscape with modern tools.

    If your company uses this project, we'd love to hear from you! Feel free to [let us know](mailto:support@yourdomain.com).
    `
  }
];
