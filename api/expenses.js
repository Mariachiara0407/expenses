// api/expenses.js

// This array acts as a temporary in-memory database.
// WARNING: This data will be lost when the serverless function goes to sleep.
const expenses = [];

export default function handler(req, res) {
  const { method } = req;

  // 1. Handle GET Requests
  if (method === 'GET') {
    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  }

  // 2. Handle POST Requests
  if (method === 'POST') {
    // Destructure fields from the request body
    const { amount, description, category, date } = req.body;

    // Validate that all fields are present
    if (!amount || !description || !category || !date) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please provide: amount, description, category, and date.",
      });
    }

    // Create the new expense object
    const newExpense = {
      id: Date.now().toString(), // Simple unique ID based on timestamp
      amount,
      description,
      category,
      date,
    };

    // Add to the in-memory array
    expenses.push(newExpense);

    // Return the created resource
    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  }

  // 3. Handle Unsupported Methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: `Method ${method} Not Allowed`,
  });
}
