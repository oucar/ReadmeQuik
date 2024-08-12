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

    To run this project, you will need to add the following environment variables to your .env file

    \`API_KEY\`

    \`ANOTHER_API_KEY\`

`,
  },
  {
    name: "FAQ",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## FAQ

    #### Question 1

    Answer 1

    #### Question 2

    Answer 2

`,
  },
  {
    name: "Features",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Features

    - Light/dark mode toggle
    - Live previews
    - Fullscreen mode
    - Cross platform

`,
  },
  {
    name: "Feedback",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Feedback

    If you have any feedback, please reach out to us at fake@fake.com

`,
  },
  {
    name: "Installation",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Installation 
    
    Install my-project with npm

    \`\`\`bash
    npm install my-project
    cd my-project
    \`\`\`

`,
  },
  {
    name: "Lessons",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Lessons Learned

    What did you learn while building this project? What challenges did you face and how did you overcome them?

`,
  },
  {
    name: "License",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## License

    [MIT](https://choosealicense.com/licenses/mit/)

`,
  },
  {
    name: "Logo",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

`,
  },
  {
    name: "Optimizations",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Optimizations

    What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

`,
  },
  {
    name: "Related",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Related

    Here are some related projects

    [Awesome README](https://github.com/matiassingers/awesome-readme)

`,
  },
  {
    name: "Roadmap",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Roadmap

    - Additional browser support
    - Add more integrations

`,
  },
  {
    name: "Acknowledgements",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Acknowledgements

    - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
    - [Awesome README](https://github.com/matiassingers/awesome-readme)
    - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

`,
  },
  {
    name: "Screenshots",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Screenshots

    ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

`,
  },
  {
    name: "Support",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Support

    For support, email fake@fake.com or join our Slack channel.

`,
  },
  {
    name: "Tech Stack",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Tech Stack

    **Client:** React, Redux, TailwindCSS

    **Server:** Node, Express

`,
  },
  {
    name: "Appendix",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Appendix

    Any additional information goes here

`,
  },
  {
    name: "Usage/Examples",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Usage/Examples

    \`\`\`javascript
    import Component from 'my-project'

    function App() {
      return <Component />
    }
    \`\`\`

`,
  },
  {
    name: "Used By",
    category: Category.Project,
    type: BlockType.Single,
    markdown: dedent`
    ## Used By

    This project is used by the following companies:

    - Company 1
    - Company 2

`,
  },
];
