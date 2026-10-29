// Statuses follow the owner's updates, not draft PDF headers.
// Field inference: October 29, 2026; title and author verified against arXiv.
export const tmlrVenue = 'Transactions on Machine Learning Research (TMLR)';
export const tmlrStatus = 'In preparation for submission to TMLR';

export const flowControl = {
  title: 'Audited Surrogate Gradients for Efficient Model-Based Flow Control',
  year: '2026',
  summary: 'Audits surrogate action gradients against high-fidelity finite differences, extracts a compact feedback law, and anchors policy optimization to that law before validating controllers in the original solver.',
  workshopVenue: 'Sim2Science workshop at NeurIPS 2026',
  workshopStatus: 'Accepted',
  venue: tmlrVenue,
  status: tmlrStatus,
  label: 'Manuscript in preparation'
};

export const fieldInference = {
  venue: 'Learning for Dynamics and Control Conference (L4DC)',
  status: 'Submitted to L4DC',
  label: 'Conference submission',
  arxiv: 'https://arxiv.org/abs/2610.12723',
  title: 'Spatial Context or Memory? Sizing the Inputs of Neural Surrogates for Partially Observed Fields',
  year: '2026',
  summary: 'Studies when temporal history can replace spatial context in forecasting from sparse or noisy sensors, using exact Gaussian conditioning and learned models of linear fields, Burgers flow, and the Kuramoto–Sivashinsky equation.'
};
