export const containerCurrentForm = {
	hidden: {
		opacity: 0,
		y: 80,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.2,
			ease: "linear",
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		y: 80,
		transition: {
			ease: "easeOut",
		},
	},
};

export const containerCampaignForm = {
	hidden: {
		opacity: 0,
		x: -80,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.2,
			ease: "linear",
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		x: 80,
		transition: {
			ease: "easeOut",
		},
	},
};

export const containerMultiStepForm = {
	hidden: {
		opacity: 0,
		x: -80,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.5,
			ease: "linear",
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		x: 80,
		transition: {
			ease: "easeOut",
		},
	},
};

export const containerMultiStepNavbar = {
	hidden: {
		opacity: 0,
		x: -10,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.1,
			ease: "linear",
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		x: 10,
		transition: {
			ease: "easeOut",
		},
	},
};
