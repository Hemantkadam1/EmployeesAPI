let express = require('express');
let { sequelize } = require('./lib/index');
let { agent } = require('./models/agent.model');
let { customer } = require('./models/customer.model');
let { ticket } = require('./models/ticket.model');
let { ticketAgent } = require('./models/ticketAgent.model');
let { ticketCustomer } = require('./models/ticketCustomer.model');
let { Op } = require('@sequelize/core');
let app = express();
app.use(express.json());

app.get('/seed_db', async (req, res) => {
  await sequelize.sync({ force: true });

  let tickets = await ticket.bulkCreate([
    {
      ticketId: 1,
      title: 'Login Issue',
      description: 'Cannot login to account',
      status: 'open',
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      ticketId: 2,
      title: 'Payment Failure',
      description: 'Payment not processed',
      status: 'closed',
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      ticketId: 3,
      title: 'Bug Report',
      description: 'Found a bug in the system',
      status: 'open',
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ]);

  let customers = await customer.bulkCreate([
    { customerId: 1, name: 'Alice', email: 'alice@example.com' },
    { customerId: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  let agents = await agent.bulkCreate([
    { agentId: 1, name: 'Charlie', email: 'charlie@example.com' },
    { agentId: 2, name: 'Dave', email: 'dave@example.com' },
  ]);

  await ticketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ]);

  await ticketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
    { ticketId: tickets[2].id, agentId: agents[0].id },
    { ticketId: tickets[1].id, agentId: agents[1].id },
  ]);

  return res.json({ message: 'Database seeded successfully' });
});
//helper function for agent
async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  });

  let agentData;
  for (let age of ticketAgents) {
    agentData = await agent.findOne({ where: { agentId: age.agentId } });
  }

  return agentData;
}

// Helper function to get ticket's associated customers
async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  });

  let customerData;
  for (let cus of ticketCustomers) {
    customerData = await customer.findOne({
      where: { customerId: cus.customerId },
    });
  }

  return customerData;
}

// Helper function to get ticket details with associated customers and agents
async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  };
}
//endpoint 1
async function getAllTicket() {
  let tickets = await ticket.findAll();

  const detailedTickets = [];

  // Loop through each ticket and fetch additional details
  for (const ticket of tickets) {
    const ticketDetails = await getTicketDetails(ticket);
    detailedTickets.push(ticketDetails);
  }
  return { detailedTickets };
}

app.get('/tickets', async (req, res) => {
  try {
    let response = await getAllTicket();

    if (response.detailedTickets.length === 0) {
      return res.status(404).json({ message: 'No tickets  found' });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Excerise 2 Get Ticket By ID
async function getTicketById(ticketId) {
  const tickets = await ticket.findOne({
    where: { id: ticketId }, // Correctly use ticketId
  });
  const detailedTickets2 = [];

  // Fetch additional details for the ticket
  const ticketDetails = await getTicketDetails(tickets);
  return { detailedTickets2: [ticketDetails] }; // Return ticket details in an array
}

app.get('/tickets/details/:id', async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id); // Consistent naming
    const response = await getTicketById(ticketId);

    // Check if the ticket was found
    if (!response || response.detailedTickets2.length === 0) {
      return res.status(404).json({ message: 'Ticket not found by ID' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 3: Get Tickets by Status
async function getTicketByStatus(status) {
  let tickets = await ticket.findOne({ where: { status: status } });
  const detailedTickets3 = [];
  const ticketDetails = await getTicketDetails(tickets);
  return { detailedTickets3: [ticketDetails] };
}
app.get('/tickets/status/:status', async (req, res) => {
  try {
    const status = req.params.status; // Consistent naming
    const response = await getTicketByStatus(status);

    // Check if the ticket was found
    if (!response || response.detailedTickets3.length === 0) {
      return res.status(404).json({ message: 'Ticket not found by status' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 4: Get Tickets Sorted by Priority
// Function to fetch tickets sorted by priority
async function getTicketsSortedByPriority() {
  // Fetch tickets sorted by priority in ascending order
  const tickets = await ticket.findAll({
    order: [['priority', 'ASC']], // Assuming 'priority' is the field name
  });

  const detailedTickets = [];

  // Loop through each ticket and fetch additional details
  for (const ticket of tickets) {
    const ticketDetails = await getTicketDetails(ticket);
    detailedTickets.push(ticketDetails);
  }

  return detailedTickets; // Return the array of detailed tickets
}
//Exercise 4: Get Tickets Sorted by Priority
// Endpoint to get tickets sorted by priority
app.get('/tickets/sort-by-priority', async (req, res) => {
  try {
    const response = await getTicketsSortedByPriority();

    // If no tickets are found, return an empty array
    if (response.length === 0) {
      return res.status(404).json({ message: 'No tickets found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 5: Add a New Ticket
// Function to add a new ticket
async function addNewTicket(ticketData) {
  // Create a new ticket in the database
  const newTicket = await ticket.create(ticketData);
  return newTicket; // Return the created ticket
}
//Exercise 5: Add a New Ticket
// Endpoint to add a new ticket
app.post('/tickets/new', async (req, res) => {
  try {
    // Extract ticket data from the request body
    const ticketData = req.body;

    // Validate the incoming data (you can add more validation as needed)
    if (!ticketData.title || !ticketData.priority) {
      return res.status(400).json({ message: 'Title and priority are required' });
    }

    // Call the function to add the new ticket
    const newTicket = await addNewTicket(ticketData);

    // Return a success response with the created ticket
    return res.status(200).json(newTicket);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 6: Update Ticket Details
// Function to update a ticket
async function updateTicket(id, ticketData) {
  // Find the ticket record matching id
  const existingTicket = await ticket.findOne({ where: { id } });

  if (!existingTicket) {
    return null; // Return null if the ticket is not found
  }

  // Update the ticket data
  for (const [key, value] of Object.entries(ticketData)) {
    // Skip if the key is not present in the request body
    if (value === undefined) {
      continue;
    }

    // Handle customerId and agentId separately
    if (key === 'customerId' || key === 'agentId') {
      // Delete existing records in the respective tables
      await someOtherTable.destroy({ where: { ticketId: id } });

      // Create a new record with the updated customerId or agentId
      await someOtherTable.create({ ticketId: id, [key]: value });
    } else {
      // Update other properties directly
      existingTicket[key] = value;
    }
  }

  // Save the updated ticket
  await existingTicket.save();
  return existingTicket; // Return the updated ticket
}

// Endpoint to update a ticket
app.post('/tickets/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Extract the ticket id from the URL
    const ticketData = req.body; // Extract ticket data from the request body

    // Call the function to update the ticket
    const updatedTicket = await updateTicket(id, ticketData);

    // Return a success response with the updated ticket
    if (updatedTicket) {
      return res.status(200).json(updatedTicket);
    } else {
      return res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 7: Delete a Ticket
// Function to delete a ticket
async function deleteTicket(id) {
  // Delete records from ticketCustomer and ticketAgent tables
  await ticketCustomer.destroy({ where: { ticketId: id } });
  await ticketAgent.destroy({ where: { ticketId: id } });

  // Delete the ticket record
  const deletedCount = await ticket.destroy({ where: { id } });
  return deletedCount; // Return the number of deleted records
}

// Endpoint to delete a ticket
app.post('/tickets/delete', async (req, res) => {
  try {
    const { id } = req.body; // Extract ticket id from the request body

    // Validate the incoming data
    if (!id) {
      return res.status(400).json({ message: 'Ticket ID is required' });
    }

    // Call the function to delete the ticket
    const deletedCount = await deleteTicket(id);

    // Check if any records were deleted
    if (deletedCount > 0) {
      return res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
