export class IdleState {
    constructor(context) {
        this.context = context;
    }

    handleChange(e) {
        this.context.setFormData({
            ...this.context.formData,
            [e.target.name]: e.target.value,
        });
    }

    handleImageChange(e) {
        this.context.setImageFile(e.target.files[0]);
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { formData, imageFile, setError, transitionTo } = this.context;

        if (
            !formData.name ||
            !formData.date ||
            !formData.time ||
            !formData.location ||
            !formData.description ||
            !imageFile
        ) {
            setError("Please fill all fields and select an image ");
            return;
        }
        setError("");
        transitionTo(new UploadingImageState(this.context));
        await this.context.currentState.handleSubmit(e);
    }
}

export class UploadingImageState {
    constructor(context) {
        this.context = context;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { formData, imageFile, uploadImage, setPopupMessage, setShowPopup, transitionTo
        } = this.context;

        try {
            const form = new formData();
            form.append("image", imageFile);
            form.append("eventName", formData.name);

            const imageResult = await uploadImage(form);

            if (!imageResult.success) {
                setPopupMessage("Image Upload Successfully");
                setShowPopup(true);
                transitionTo(new ErrorState(this.context));
                return;
            }

            this.context.imageFileName = imageResult.name;
            transitionTo(new SubmittingFormState(this.context));

        }

        catch (error) {
            setPopupMessage("Image Upload Error");
            setShowPopup(true);
            transitionTo(new ErrorState(this.context));
        }
    }
}

export class SubmittingFormState {
    constructor(context) {
        this.context = context;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { formData, imageFileName, mutation, formatTime, formatDate, transitionTo, setPopupMessage, setShowPopup, resetForm
        } = this.context;

        const finalEvent = {
            ...formData,
            time: formatTime(formData.time),
            data: formatDate(formData.data),
            image: imageFileName,
        };

        mutation.mutate(finalEvent, {
            onSuccess: () => {
                setPopupMessage("Event Created");
                setShowPopup(true);
                resetForm();
                transitionTo(new IdleState(this.context));

            },

            onError: (error) => {
                setPopupMessage(error.response?.data?.message || 'Failed to Create Event');
                setShowPopup(true);
                transitionTo(new ErrorState(this.context));
            }
        })
    }
}

export class ErrorState {
    constructor(context) {
        this.context = context;
    }

}
