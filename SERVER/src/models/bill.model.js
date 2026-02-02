// models/Bill.js
import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    billNumber: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    
    // Patient snapshot (for PDF generation even if patient deleted)
    patientName: String,
    patientAge: Number,
    patientGender: String,
    patientPhone: String,
    
    // Test items
    items: [{
        testName: {
            type: String,
            required: true
        },
        testCode: String,
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        subtotal: Number
    }],
    
    // Amounts
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    // tax: {
    //     type: Number,
    //     default: 0
    // },
    billAmount: {
        type: Number,
        required: true
    },
    
    // Payment
    billStatus: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'partially paid'],
        default: 'pending'
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    pendingAmount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi', 'card', 'online', 'cheque'],
        default: 'cash'
    },
    
    // Dates
    billDate: {
        type: Date,
        default: Date.now
    },
    dueDate: Date,
    
    // Notes
    notes: String

}, {
    timestamps: true
});

// Auto-generate bill number before save
billSchema.pre('save', async function(next) {
    if (!this.billNumber) {
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await mongoose.model('Bill').countDocuments({ 
            createdAt: {
                $gte: new Date(date.setHours(0, 0, 0, 0))
            }
        });
        this.billNumber = `BILL-${dateStr}-${String(count + 1).padStart(3, '0')}`;
    }
    
    // Calculate pending amount
    this.pendingAmount = this.billAmount - this.paidAmount;
    
    next();
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;