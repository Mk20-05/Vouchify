// src/Pages/WriteReviewPage.jsx (with Confirmation Modal)
import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'; // Added Dialog
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';
import {
    StarIcon as StarIconOutline,
    ChatBubbleLeftRightIcon,
    ArrowLeftIcon,
    TicketIcon,
    PencilSquareIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    ArrowPathIcon,
    ShieldCheckIcon, // Icon for confirmation modal
    XMarkIcon // Icon for closing modal
} from '@heroicons/react/24/outline';

// --- Mock Data Fetching (Keep as is) ---
const getMockVoucherForReview = (id) => {
    const mockData = {
        v1: { name: 'Amazon 10% Off Electronics', category: 'Electronics' },
        v2: { name: 'Flipkart Rs. 500 Off Fashion', category: 'Fashion' },
        v3: { name: 'Myntra 20% Off Sitewide', category: 'Fashion' },
        v4: { name: 'Zomato 50% Off (Up to Rs. 100)', category: 'Food' },
    };
    if (id === 'general' || !mockData[id]) { return null; }
    return mockData[id];
};
// --- ---

const MIN_COMMENT_LENGTH = 10;

const WriteReviewPage = () => {
    const { voucherId } = useParams();
    const isGeneralFeedback = voucherId === 'general';

    // --- State ---
    const [voucherInfo, setVoucherInfo] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isFetchingVoucher, setIsFetchingVoucher] = useState(!isGeneralFeedback);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // <-- New State

    // --- Effect for Fetching Voucher Data (Keep as is) ---
    useEffect(() => {
        setVoucherInfo(null);
        setRating(0);
        setComment('');
        setIsFetchingVoucher(!isGeneralFeedback);
        setIsSubmitting(false);
        setFetchError('');
        setSubmitError('');
        setSubmitSuccess(false);
        setIsConfirmModalOpen(false); // Reset modal state too

        if (!isGeneralFeedback) {
            console.log("Fetching details for specific voucher ID:", voucherId);
            const timer = setTimeout(() => {
                const info = getMockVoucherForReview(voucherId);
                if (info) { setVoucherInfo(info); setFetchError(''); }
                else { setFetchError(`Could not find details for voucher ID: ${voucherId}.`); setVoucherInfo(null); }
                setIsFetchingVoucher(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            console.log("General feedback mode initialized.");
            setVoucherInfo({ name: "Vouchify Platform Experience" });
            setIsFetchingVoucher(false);
        }
    }, [voucherId, isGeneralFeedback]);

    // --- Handlers ---
    const handleCommentChange = (e) => {
        setComment(e.target.value);
        if (submitError && e.target.value.trim().length >= MIN_COMMENT_LENGTH) {
            setSubmitError('');
        }
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        if (submitError && !isGeneralFeedback && newRating > 0) {
             setSubmitError('');
        }
    };

    // --- MODIFIED: Opens Confirmation Modal ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError(''); // Clear previous submit errors before validation

        // Validation
        if (!isGeneralFeedback && rating === 0) {
            setSubmitError('Please select a star rating for the voucher.'); return;
        }
        if (comment.trim().length < MIN_COMMENT_LENGTH) {
            setSubmitError(`Please provide feedback (at least ${MIN_COMMENT_LENGTH} characters).`); return;
        }
        if (!isGeneralFeedback && !voucherInfo) {
            setSubmitError(`Cannot submit review: voucher details unavailable.`); return;
        }

        // If validation passes, open the confirmation modal
        setIsConfirmModalOpen(true);
    };

    // --- NEW: Handles the Actual Submission from Modal ---
    const handleConfirmSubmit = async () => {
        setIsConfirmModalOpen(false); // Close the confirmation modal
        setIsSubmitting(true);
        setSubmitError(''); // Clear any previous errors before trying again
        console.log("Confirmed - Submitting:", { /* ... */ });

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
            // if (Math.random() < 0.3) throw new Error("Simulated submission error"); // Test error case
            setSubmitSuccess(true);
        } catch (apiError) {
            console.error("Submission failed:", apiError);
            setSubmitError(`Failed to submit ${isGeneralFeedback ? 'feedback' : 'review'}. Please try again.`);
            setSubmitSuccess(false); // Ensure success flag is false on error
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- NEW: Closes the confirmation modal ---
    const closeConfirmModal = () => {
        if (!isSubmitting) { // Prevent closing if already submitting
            setIsConfirmModalOpen(false);
        }
    };

    // --- Derived State / Constants (Keep as is) ---
    const pageTitle = isGeneralFeedback ? "Share Platform Feedback" : "Write a Review";
    const pageSubtitle = isGeneralFeedback ? "Help us improve!" : (voucherInfo ? `Reviewing: ${voucherInfo.name}` : (isFetchingVoucher ? "Loading..." : "Voucher unavailable"));
    const commentLabel = isGeneralFeedback ? "Your Feedback / Suggestions" : "Your Review / Feedback";
    const commentPlaceholder = `Min. ${MIN_COMMENT_LENGTH} characters...`;
    const ratingLabel = isGeneralFeedback ? "Overall Platform Rating (Optional)" : "Your Rating for this Voucher";
    const backLinkPath = isGeneralFeedback ? "/" : "/vouchers";
    const backLinkLabel = isGeneralFeedback ? "Back to Home" : "Back to Vouchers List";
    const submitButtonText = isGeneralFeedback ? "Submit Feedback" : "Submit Review";
    const isSubmitButtonDisabled = isSubmitting || (!isGeneralFeedback && !voucherInfo && !!fetchError);


    // --- Render Initial Loading State (Keep as is) ---
    if (isFetchingVoucher) { /* ... loading indicator ... */
         return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-yellow-100 text-gray-600">
                <div className="flex items-center space-x-3">
                    <ArrowPathIcon className="h-6 w-6 animate-spin text-yellow-600" />
                    <span className="text-lg font-medium">Loading Details...</span>
                </div>
            </div>
        );
    }

    // --- Render Main Component ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-xl mx-auto">
                {/* Header (Keep as is) */}
                <div className="text-center mb-8">
                    <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto text-yellow-600 mb-3" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{pageTitle}</h1>
                    <p className="mt-3 text-base text-gray-600 flex items-center justify-center px-4">
                        {!isGeneralFeedback && voucherInfo && <TicketIcon className="h-5 w-5 mr-1.5 text-gray-400 flex-shrink-0" />}
                        <span className="truncate">{pageSubtitle}</span>
                    </p>
                    {fetchError && (
                         <div className="mt-4 inline-flex items-center justify-center p-3 bg-red-50 text-red-700 rounded-md border border-red-200 max-w-md mx-auto w-full">
                            <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                            <p className="text-sm font-medium">{fetchError}</p>
                        </div>
                    )}
                </div>

                {/* Form Container (Conditionally Hidden on Success) */}
                <div className={`bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-out ${submitSuccess ? 'max-h-0 opacity-0 invisible p-0' : 'max-h-[1000px] opacity-100 visible p-6 sm:p-8'}`}>
                   {/* Form submits to open modal */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Star Rating RadioGroup (Keep as is) */}
                        <RadioGroup value={rating} onChange={handleRatingChange} name="rating">
                            {/* ... RadioGroup Label and Options ... */}
                             <RadioGroup.Label className="block text-lg font-semibold text-gray-800 mb-3 text-center">
                                {ratingLabel} {!isGeneralFeedback && <span className="text-red-500">*</span>}
                            </RadioGroup.Label>
                            {isGeneralFeedback && <p className="text-center text-xs text-gray-500 -mt-2 mb-3">(Optional)</p>}
                            <div className="flex justify-center items-center space-x-1.5">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <RadioGroup.Option key={value} value={value} /* ... styling classes ... */
                                     className={({ active, checked }) =>`relative flex cursor-pointer rounded-full p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 transition-all duration-150 ease-in-out transform hover:scale-110 ${active ? 'ring-2 ring-yellow-400 ring-offset-1' : ''} ${checked ? 'bg-yellow-100' : ''}` }
                                     aria-label={`Rate ${value} out of 5 stars`} >
                                        {({ checked }) => (<StarIconSolid className={`h-10 w-10 transition-colors duration-150 ${checked ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`} aria-hidden="true" />)}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>

                        {/* Comment Textarea (Keep as is) */}
                        <div className="relative">
                             {/* ... Label, Textarea, Counter ... */}
                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                                <PencilSquareIcon className="h-5 w-5 mr-1.5 text-gray-400" />
                                {commentLabel} <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea id="comment" name="comment" rows="5" required minLength={MIN_COMMENT_LENGTH} value={comment} onChange={handleCommentChange} placeholder={commentPlaceholder}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-colors ${ submitError && comment.trim().length < MIN_COMMENT_LENGTH ? 'border-red-400 ring-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500' }`}
                                aria-describedby="comment-description" aria-invalid={!!(submitError && comment.trim().length < MIN_COMMENT_LENGTH)} />
                            <p id="comment-description" className="mt-1.5 text-xs text-gray-500 flex justify-between items-center">
                                <span>Minimum {MIN_COMMENT_LENGTH} characters required.</span>
                                <span className={`font-medium ${comment.length < MIN_COMMENT_LENGTH ? 'text-red-500' : 'text-green-600'}`}>{comment.length}/{MIN_COMMENT_LENGTH}+</span>
                            </p>
                        </div>

                        {/* Submission Error Area (Keep as is) */}
                        <Transition show={!!submitError} as={Fragment} /* ... transition props ... */
                         enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                            <div className="flex items-start p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                                <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                <p className="text-sm flex-1">{submitError}</p>
                            </div>
                        </Transition>

                        {/* Submit Button (Now triggers modal) */}
                        <div>
                            <button type="submit" disabled={isSubmitButtonDisabled} /* ... styling classes ... */
                              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out ${ isSubmitButtonDisabled ? 'bg-yellow-300 cursor-not-allowed opacity-70' : 'bg-yellow-500 hover:bg-yellow-600' }`}>
                                { /* No loading indicator here anymore */}
                                <PaperAirplaneIcon className="h-5 w-5 mr-2 transform -rotate-45" />
                                {submitButtonText}
                            </button>
                             {(!isGeneralFeedback && !voucherInfo && !!fetchError) && <p className="mt-2 text-xs text-center text-red-600">Submission disabled: Voucher details unavailable.</p>}
                        </div>
                    </form>
                </div>

                {/* Success Message Container (Keep as is) */}
                <Transition show={submitSuccess} as={Fragment} /* ... transition props ... */
                 enter="transition ease-out duration-300 delay-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <div className="text-center p-8 sm:p-12 bg-white shadow-2xl rounded-lg">
                         {/* ... Success Icon, Text, Back Link ... */}
                         <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
                        <p className="text-xl font-semibold text-green-800 mb-5">Thank You!</p>
                        <p className="text-base text-gray-600 mb-6">Your {isGeneralFeedback ? 'feedback' : 'review'} has been submitted successfully.</p>
                        <Link to={backLinkPath} className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                            <ArrowLeftIcon className="h-5 w-5 mr-2" /> {backLinkLabel}
                        </Link>
                    </div>
                </Transition>

                {/* Back Link (Keep as is) */}
                {!submitSuccess && ( /* ... Back Link JSX ... */
                    <div className="text-center mt-8">
                        <Link to={backLinkPath} className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-700 hover:underline transition duration-300 group">
                            <ArrowLeftIcon className="h-4 w-4 mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                            {backLinkLabel}
                        </Link>
                    </div>
                )}

            </div>

            {/* --- NEW: Confirmation Modal --- */}
            <Transition appear show={isConfirmModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeConfirmModal}>
                    {/* Backdrop */}
                    <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            {/* Modal Panel */}
                            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                                        <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-2" />
                                        Confirm Your Submission
                                    </Dialog.Title>
                                    <button onClick={closeConfirmModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Close">
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>

                                    <div className="mt-4 space-y-4">
                                        {/* Display Rating */}
                                        {(rating > 0 || isGeneralFeedback) && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Your Rating:</p>
                                                <div className="flex items-center space-x-0.5 mt-1">
                                                    {rating === 0 && isGeneralFeedback ? (
                                                        <span className="text-sm text-gray-500 italic">No rating selected (optional)</span>
                                                    ) : (
                                                        [1, 2, 3, 4, 5].map(star => (
                                                            <StarIconSolid key={star} className={`h-6 w-6 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Display Comment */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Your Comment:</p>
                                            <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 max-h-32 overflow-y-auto">
                                                {comment.trim() || <span className="italic text-gray-400">No comment provided.</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={closeConfirmModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            className="inline-flex justify-center items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 disabled:cursor-not-allowed"
                                            onClick={handleConfirmSubmit} // Trigger actual submission
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Confirm & Submit'
                                            )}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* --- End Confirmation Modal --- */}

        </div>
    );
};

export default WriteReviewPage;