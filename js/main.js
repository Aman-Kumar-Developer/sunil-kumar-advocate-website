const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
}

// ==========================================================================
// FEATURED MATTERS FILTERING & PAGINATION
// ==========================================================================
const featuredFilters = document.querySelectorAll(".featured-filter[data-filter]");
const featuredGrid = document.getElementById("featured-grid");
const featuredPagination = document.getElementById("featured-pagination");
const featuredCards = document.querySelectorAll(".featured-card[data-category]");

if (featuredFilters.length && (featuredGrid || featuredCards.length)) {
    const ITEMS_PER_PAGE = 6;
    let currentCategory = "all";
    let currentPage = 1;

    const renderFeaturedCard = (item) => `
        <article class="featured-card" data-category="${item.category}">
            <a class="featured-card__image-link" href="${item.url}"
                aria-label="Read details about ${item.title}">
                <img class="featured-card__image" src="${item.image}"
                    alt="${item.imageAlt || item.title}" width="800" height="500" loading="lazy"
                    decoding="async">
            </a>
            <div class="featured-card__body">
                <div class="featured-card__meta">
                    <span class="featured-card__category">${item.categoryLabel}</span>
                    <time class="featured-card__date" datetime="${item.date}">
                        ${item.formattedDate || item.date}
                    </time>
                </div>
                <h3 class="featured-card__title">
                    <a href="${item.url}">${item.title}</a>
                </h3>
                <p class="featured-card__excerpt">${item.excerpt}</p>
                <a class="featured-card__link" href="${item.url}">
                    View Details <span aria-hidden="true">→</span>
                </a>
            </div>
        </article>`;

    const updateFeaturedView = (shouldScroll = false) => {
        if (window.featuredMattersData && featuredGrid) {
            const dataset = window.featuredMattersData;
            const filtered = currentCategory === "all"
                ? dataset
                : dataset.filter(item => item.category === currentCategory);

            const totalCount = filtered.length;
            const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

            if (currentPage > totalPages) currentPage = 1;

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            featuredGrid.innerHTML = pageItems.map(renderFeaturedCard).join("\n");

            if (featuredPagination) {
                if (totalPages <= 1) {
                    featuredPagination.innerHTML = "";
                    featuredPagination.style.display = "none";
                } else {
                    featuredPagination.style.display = "flex";
                    let navHtml = `<button type="button" class="pagination-btn pagination-btn--prev" aria-label="Go to previous page" ${currentPage === 1 ? "disabled" : ""}>← Previous</button>`;

                    for (let p = 1; p <= totalPages; p++) {
                        navHtml += `<button type="button" class="pagination-btn ${p === currentPage ? "is-active" : ""}" data-page="${p}" aria-label="Go to page ${p}" ${p === currentPage ? 'aria-current="page"' : ""}>${p}</button>`;
                    }

                    navHtml += `<button type="button" class="pagination-btn pagination-btn--next" aria-label="Go to next page" ${currentPage === totalPages ? "disabled" : ""}>Next →</button>`;

                    featuredPagination.innerHTML = navHtml;

                    featuredPagination.querySelectorAll("[data-page]").forEach((btn) => {
                        btn.addEventListener("click", () => {
                            currentPage = Number(btn.dataset.page);
                            updateFeaturedView(true);
                        });
                    });

                    const prevBtn = featuredPagination.querySelector(".pagination-btn--prev");
                    if (prevBtn) {
                        prevBtn.addEventListener("click", () => {
                            if (currentPage > 1) {
                                currentPage--;
                                updateFeaturedView(true);
                            }
                        });
                    }

                    const nextBtn = featuredPagination.querySelector(".pagination-btn--next");
                    if (nextBtn) {
                        nextBtn.addEventListener("click", () => {
                            if (currentPage < totalPages) {
                                currentPage++;
                                updateFeaturedView(true);
                            }
                        });
                    }
                }
            }
        } else if (featuredCards.length) {
            featuredCards.forEach((card) => {
                card.hidden = currentCategory !== "all" && card.dataset.category !== currentCategory;
            });
        }

        if (shouldScroll && featuredGrid) {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            featuredGrid.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        }
    };

    featuredFilters.forEach((filter) => {
        filter.addEventListener("click", () => {
            currentCategory = filter.dataset.filter;
            currentPage = 1;

            featuredFilters.forEach((btn) => {
                const isActive = btn === filter;
                btn.classList.toggle("is-active", isActive);
                btn.setAttribute("aria-pressed", String(isActive));
            });

            updateFeaturedView(false);
        });
    });

    const activeFilter = document.querySelector(".featured-filter[aria-pressed='true']");
    if (activeFilter) {
        currentCategory = activeFilter.dataset.filter;
    }
    updateFeaturedView(false);
}

// ==========================================================================
// SITE-WIDE SEARCH (PRACTICE AREAS, COURTS, FEATURED & INSIGHTS)
// ==========================================================================
(() => {
    const searchButtons = document.querySelectorAll('.search-button');
    if (!searchButtons.length) return;

    const siteIndex = [
    {
        "title": "Home",
        "type": "Page",
        "url": "/",
        "snippet": "Official professional portfolio of Advocate Sunil Kumar Upadhyay, practicing before the Delhi High Court and District Courts.",
        "keywords": "sunil kumar upadhyay advocate upadhyay associates delhi high court karkardooma lawyer counsel portfolio"
    },
    {
        "title": "About Advocate Sunil Kumar Upadhyay",
        "type": "Page",
        "url": "/about/",
        "snippet": "Professional legal profile, litigation experience since 2012, advocacy background, bar memberships and chambers.",
        "keywords": "about advocate sunil kumar upadhyay experience qualifications karkardooma bar delhi high court profile credentials"
    },
    {
        "title": "Contact & Chamber Consultation",
        "type": "Page",
        "url": "/contact/",
        "snippet": "Lawyers Chamber Block F-67, First Floor, Karkardooma Courts, Delhi. Telephone, email, and consultation hours.",
        "keywords": "contact consultation chamber f-67 karkardooma phone email appointment legal consultation phone number"
    },
    {
        "title": "Privacy Policy",
        "type": "Page",
        "url": "/privacy-policy/",
        "snippet": "Official privacy policy and client data protection practices of Advocate Sunil Kumar Upadhyay.",
        "keywords": "privacy policy data protection terms client confidentiality information security"
    },
    {
        "title": "Terms of Use & Regulatory Disclaimer",
        "type": "Page",
        "url": "/terms-of-use/",
        "snippet": "Website terms of use, Bar Council of India regulatory compliance declaration, and informational disclaimer.",
        "keywords": "terms of use bar council disclaimer rules legal information professional ethics"
    },
    {
        "title": "Practice Areas Overview",
        "type": "Practice Area",
        "url": "/practice-areas/",
        "snippet": "Comprehensive legal representation across banking, civil, property, criminal, arbitration, matrimonial and writ litigation.",
        "keywords": "practice areas litigation commercial civil criminal corporate banking property family arbitration writ"
    },
    {
        "title": "Banking & Recovery Litigation (SARFAESI)",
        "type": "Practice Area",
        "url": "/practice-areas/banking-recovery/",
        "snippet": "Security interest enforcement, DRT & DRAT proceedings, Section 13(2), Section 13(4), Section 14 CMM possession, loan restructuring.",
        "keywords": "banking recovery sarfaesi drt drat debts recovery tribunal bank auction section 13 npa borrower rights mortgage loan default"
    },
    {
        "title": "Civil, Commercial & Contractual Matters",
        "type": "Practice Area",
        "url": "/practice-areas/civil-commercial/",
        "snippet": "Commercial disputes, breach of contract, pre-institution mediation, specific performance, summary suits Order 37 CPC, matrimonial disputes.",
        "keywords": "civil commercial litigation contract breach commercial court act order 37 mediation injunction specific performance damage claims matrimonial disputes family law"
    },
    {
        "title": "Property Disputes & Real Estate Litigation",
        "type": "Practice Area",
        "url": "/practice-areas/property/",
        "snippet": "Partition suits, title verification, due diligence, injunction against dispossession, Delhi Rent Control, land records.",
        "keywords": "property disputes real estate partition ancestral property due diligence title deed possession eviction rent control agreement to sell transfer of property"
    },
    {
        "title": "Criminal & NI Act Matters (Section 138)",
        "type": "Practice Area",
        "url": "/practice-areas/criminal-ni-act/",
        "snippet": "Cheque bounce prosecutions under Section 138 NI Act, anticipatory bail, regular bail, FIR quashing, statutory demand notices.",
        "keywords": "criminal ni act section 138 cheque bounce cheque dishonour bail anticipatory bail fir quashing section 482 bnss 528 summons bns trial statutory notice"
    },
    {
        "title": "Arbitration & Dispute Resolution",
        "type": "Practice Area",
        "url": "/practice-areas/arbitration/",
        "snippet": "Domestic arbitration, Section 9 interim measures, Section 11 arbitrator appointments, Section 34 challenges, award enforcement Section 36.",
        "keywords": "arbitration adr dispute resolution section 9 section 11 section 34 section 36 arbitral award mediation commercial arbitration arbitral tribunal seat venue"
    },
    {
        "title": "Constitutional & Writ Petitions",
        "type": "Practice Area",
        "url": "/practice-areas/high-court-writ/",
        "snippet": "Prerogative writs under Article 226, mandamus, certiorari, habeas corpus, Article 227 supervisory jurisdiction before Delhi High Court.",
        "keywords": "high court writ constitutional article 226 article 227 mandamus certiorari fundamental rights judicial review delhi high court administrative law"
    },
    {
        "title": "Legal Drafting, Advisory & Due Diligence",
        "type": "Practice Area",
        "url": "/practice-areas/legal-drafting-advisory/",
        "snippet": "Drafting pleadings, agreements, commercial contracts, statutory notices, title search reports, due diligence documentation.",
        "keywords": "legal drafting advisory due diligence contracts agreements pleadings legal notice title verification conveyance lease deed"
    },
    {
        "title": "Courts Overview & Delhi Jurisdictions",
        "type": "Court",
        "url": "/courts/",
        "snippet": "Overview of litigation before the Delhi High Court and all District Court complexes across National Capital Territory of Delhi.",
        "keywords": "courts delhi jurisdiction high court district court trial courts family courts civil criminal commercial"
    },
    {
        "title": "Karkardooma District Court (East & Shahdara)",
        "type": "Court",
        "url": "/courts/karkardooma/",
        "snippet": "Lawyers Chamber Block F-67; Family Courts, Commercial Courts, Civil, Criminal & MACT tribunals for East Delhi, North-East and Shahdara.",
        "keywords": "karkardooma court east delhi north east shahdara family court commercial court chamber f-67 metro station civil criminal"
    },
    {
        "title": "Tis Hazari District Court (Central & West)",
        "type": "Court",
        "url": "/courts/tis-hazari/",
        "snippet": "Historic district court complex housing Central & West Delhi civil, criminal, commercial and family courts.",
        "keywords": "tis hazari court central west delhi civil criminal court family court commercial court metro station"
    },
    {
        "title": "Patiala House District Court (New Delhi)",
        "type": "Court",
        "url": "/courts/patiala-house/",
        "snippet": "New Delhi district court handling commercial litigation, special courts, family courts, and central trial matters.",
        "keywords": "patiala house court new delhi district court india gate commercial court criminal court family court"
    },
    {
        "title": "Saket District Court (South & South-East)",
        "type": "Court",
        "url": "/courts/saket/",
        "snippet": "District court complex for South and South-East Delhi judicial districts, commercial courts, and family courts.",
        "keywords": "saket court south delhi south east family court commercial court civil criminal litigation"
    },
    {
        "title": "Rohini District Court (North & North-West)",
        "type": "Court",
        "url": "/courts/rohini/",
        "snippet": "Judicial complex for North and North-West Delhi handling civil, family, commercial and criminal litigation.",
        "keywords": "rohini court north delhi north west family court commercial court civil criminal litigation"
    },
    {
        "title": "Dwarka District Court (South-West)",
        "type": "Court",
        "url": "/courts/dwarka/",
        "snippet": "South-West Delhi district court complex handling civil disputes, family court matters, and criminal trials.",
        "keywords": "dwarka court south west delhi family court civil criminal litigation commercial disputes"
    },
    {
        "title": "Featured Matters & Highlights",
        "type": "Featured",
        "url": "/featured/",
        "snippet": "Reported judgments, notable legal developments, case notes, and professional highlights in family law and civil litigation.",
        "keywords": "featured matters reported judgments case notes publications supreme court delhi high court highlights"
    },
    {
        "title": "Insights & Legal Perspectives",
        "type": "Insight",
        "url": "/insights/",
        "snippet": "In-depth legal articles on matrimonial disputes, child custody, divorce, maintenance, banking recovery, and criminal law.",
        "keywords": "insights articles legal perspectives analysis case law statutes family law divorce custody maintenance civil criminal"
    },
    {
        "title": "Sonal Talpada v. Veerbhan Singh",
        "type": "Featured",
        "url": "/featured/sonal-talpada-v-veerbhan-singh/",
        "snippet": "Comprehensive judicial analysis on mental cruelty, prolonged separation, and the breakdown of matrimonial relations in contemporary family jurisprudence.",
        "keywords": "sonal talpada v. veerbhan singh reported judgment comprehensive judicial analysis on mental cruelty, prolonged separation, and the breakdown of matrimonial relations in contemporary family jurisprudence. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Col. Ramneesh Pal Singh v. Sugandhi Aggarwal",
        "type": "Featured",
        "url": "/featured/ramneesh-pal-singh-v-sugandhi-aggarwal/",
        "snippet": "A landmark decision reiterating that the paramount welfare of the minor child governs custody determinations above statutory parental claims.",
        "keywords": "col. ramneesh pal singh v. sugandhi aggarwal reported judgment a landmark decision reiterating that the paramount welfare of the minor child governs custody determinations above statutory parental claims. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Pradeep Bhardwaj v. Priya",
        "type": "Featured",
        "url": "/featured/pradeep-bhardwaj-v-priya/",
        "snippet": "Examination of evidentiary burdens regarding matrimonial disputes, assessment of interim maintenance, and principles governing dissolution.",
        "keywords": "pradeep bhardwaj v. priya reported judgment examination of evidentiary burdens regarding matrimonial disputes, assessment of interim maintenance, and principles governing dissolution. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Shahjahan v. State of Uttar Pradesh",
        "type": "Featured",
        "url": "/featured/shahjahan-v-state-of-uttar-pradesh/",
        "snippet": "A pivotal ruling concerning procedural delays, speedy trial guarantees, and liberty protections enshrined under Article 21 of the Constitution.",
        "keywords": "shahjahan v. state of uttar pradesh reported judgment a pivotal ruling concerning procedural delays, speedy trial guarantees, and liberty protections enshrined under article 21 of the constitution."
    },
    {
        "title": "Sugirtha v. Gowtham",
        "type": "Featured",
        "url": "/featured/sugirtha-v-gowtham/",
        "snippet": "Precedent examining the computation of maintenance pendente lite, financial disclosures by spouses, and expeditious disposal of interim reliefs.",
        "keywords": "sugirtha v. gowtham reported judgment precedent examining the computation of maintenance pendente lite, financial disclosures by spouses, and expeditious disposal of interim reliefs. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Shivangi Bansal v. Sahib Bansal",
        "type": "Featured",
        "url": "/featured/shivangi-bansal-v-sahib-bansal/",
        "snippet": "Supreme Court directives balancing structured visitation schedules with child emotional stability and equitable parental responsibilities.",
        "keywords": "shivangi bansal v. sahib bansal reported judgment supreme court directives balancing structured visitation schedules with child emotional stability and equitable parental responsibilities. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Banking Recovery & SARFAESI Enforcement Framework",
        "type": "Featured",
        "url": "/featured/banking-recovery-proceedings/",
        "snippet": "Procedural analysis of security interest enforcement under Sections 13(2), 13(4), and borrower appellate remedies before the Debts Recovery Tribunal.",
        "keywords": "banking recovery & sarfaesi enforcement framework significant matter procedural analysis of security interest enforcement under sections 13(2), 13(4), and borrower appellate remedies before the debts recovery tribunal."
    },
    {
        "title": "Mandatory Pre-Institution Mediation in Commercial Disputes",
        "type": "Featured",
        "url": "/featured/mandatory-pre-institution-mediation-commercial-disputes/",
        "snippet": "Review of Section 12A of the Commercial Courts Act 2015, exceptions for urgent interim relief, and strict compliance mandates established by the Supreme Court.",
        "keywords": "mandatory pre-institution mediation in commercial disputes significant matter review of section 12a of the commercial courts act 2015, exceptions for urgent interim relief, and strict compliance mandates established by the supreme court."
    },
    {
        "title": "Vicarious Liability of Directors under Section 141 NI Act",
        "type": "Featured",
        "url": "/featured/directors-liability-section-141-ni-act/",
        "snippet": "Examining statutory requirements for specific averments establishing day-to-day managerial responsibility to sustain cheque bounce prosecutions against directors.",
        "keywords": "vicarious liability of directors under section 141 ni act significant matter examining statutory requirements for specific averments establishing day-to-day managerial responsibility to sustain cheque bounce prosecutions against directors."
    },
    {
        "title": "Specific Performance and Injunction Jurisprudence",
        "type": "Featured",
        "url": "/featured/specific-performance-and-injunction-jurisprudence/",
        "snippet": "Analysis of post-2018 Specific Relief Act amendments making specific performance a mandatory statutory remedy rather than a discretionary equitable relief.",
        "keywords": "specific performance and injunction jurisprudence significant matter analysis of post-2018 specific relief act amendments making specific performance a mandatory statutory remedy rather than a discretionary equitable relief."
    },
    {
        "title": "Statutory Limitation and Procedural Appeals in DRT",
        "type": "Featured",
        "url": "/featured/statutory-limitation-and-procedural-appeals-drt/",
        "snippet": "Navigating the strict 45-day limitation period under Section 17 of SARFAESI and pre-deposit mandates under Section 18 for Debts Recovery Appellate Tribunal appeals.",
        "keywords": "statutory limitation and procedural appeals in drt significant matter navigating the strict 45-day limitation period under section 17 of sarfaesi and pre-deposit mandates under section 18 for debts recovery appellate tribunal appeals."
    },
    {
        "title": "Article 227 Supervisory Jurisdiction over Arbitral Orders",
        "type": "Featured",
        "url": "/featured/article-227-supervisory-jurisdiction-arbitral-orders/",
        "snippet": "High Court thresholds limiting writ intervention under Article 227 against procedural orders of arbitral tribunals to exceptional instances of patent lack of jurisdiction.",
        "keywords": "article 227 supervisory jurisdiction over arbitral orders significant matter high court thresholds limiting writ intervention under article 227 against procedural orders of arbitral tribunals to exceptional instances of patent lack of jurisdiction."
    },
    {
        "title": "Understanding Section 138 NI Act Cheque Dishonour",
        "type": "Featured",
        "url": "/featured/understanding-ni-act-prosecutions/",
        "snippet": "A practical step-by-step guide on statutory demand notice timelines, limitation computation, and evidentiary presumptions under Sections 118 and 139.",
        "keywords": "understanding section 138 ni act cheque dishonour publication a practical step-by-step guide on statutory demand notice timelines, limitation computation, and evidentiary presumptions under sections 118 and 139."
    },
    {
        "title": "Contemporary Strategies in Commercial Dispute Resolution",
        "type": "Featured",
        "url": "/featured/contemporary-strategies-commercial-dispute-resolution/",
        "snippet": "An overview of evolving dispute management strategies combining early case evaluation, structured mediation, and expedited commercial court litigation.",
        "keywords": "contemporary strategies in commercial dispute resolution publication an overview of evolving dispute management strategies combining early case evaluation, structured mediation, and expedited commercial court litigation."
    },
    {
        "title": "Title Verification and Due Diligence in Delhi Real Estate",
        "type": "Featured",
        "url": "/featured/title-verification-due-diligence-delhi-real-estate/",
        "snippet": "Essential legal checks covering 30-year encumbrance certificates, sub-registrar record searches, mutation verification, and local zonal master plan clearances.",
        "keywords": "title verification and due diligence in delhi real estate publication essential legal checks covering 30-year encumbrance certificates, sub-registrar record searches, mutation verification, and local zonal master plan clearances."
    },
    {
        "title": "Pre-Arbitral Relief under Section 9: Principles and Practice",
        "type": "Featured",
        "url": "/featured/pre-arbitral-relief-section-9-arbitration/",
        "snippet": "Examining judicial standards for prima facie merit, balance of convenience, and imminent threat required to obtain asset-freezing orders before arbitration starts.",
        "keywords": "pre-arbitral relief under section 9: principles and practice publication examining judicial standards for prima facie merit, balance of convenience, and imminent threat required to obtain asset-freezing orders before arbitration starts."
    },
    {
        "title": "Maintenance Framework under Bharatiya Nagarik Suraksha Sanhita",
        "type": "Featured",
        "url": "/featured/maintenance-framework-bharatiya-nagarik-suraksha-sanhita/",
        "snippet": "Comparative analysis of maintenance provisions under Section 144 BNSS (former Section 125 CrPC) and mandatory disclosure of assets and liabilities affidavits.",
        "keywords": "maintenance framework under bharatiya nagarik suraksha sanhita publication comparative analysis of maintenance provisions under section 144 bnss (former section 125 crpc) and mandatory disclosure of assets and liabilities affidavits. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Drafting Effective Commercial Arbitration Clauses",
        "type": "Featured",
        "url": "/featured/drafting-effective-commercial-arbitration-clauses/",
        "snippet": "Best practices in defining seat versus venue, governing substantive law, institutional rules, multi-tiered escalation mechanisms, and arbitrator qualifications.",
        "keywords": "drafting effective commercial arbitration clauses publication best practices in defining seat versus venue, governing substantive law, institutional rules, multi-tiered escalation mechanisms, and arbitrator qualifications."
    },
    {
        "title": "Procedural Safeguards in Criminal Defence and Bail Practice",
        "type": "Featured",
        "url": "/featured/procedural-safeguards-criminal-defence-bail/",
        "snippet": "Insights on arrest compliance under Arnesh Kumar guidelines, statutory remand procedures, and anticipatory bail jurisprudence across Delhi trial courts.",
        "keywords": "procedural safeguards in criminal defence and bail practice speaking & recognition insights on arrest compliance under arnesh kumar guidelines, statutory remand procedures, and anticipatory bail jurisprudence across delhi trial courts."
    },
    {
        "title": "Practical Approaches to Consumer Protection Act 2019",
        "type": "Featured",
        "url": "/featured/practical-approaches-consumer-protection-act-2019/",
        "snippet": "Discussion of pecuniary thresholds, e-filing provisions, mediation cells at District Commissions, and liability for unfair contracts and defective services.",
        "keywords": "practical approaches to consumer protection act 2019 speaking & recognition discussion of pecuniary thresholds, e-filing provisions, mediation cells at district commissions, and liability for unfair contracts and defective services."
    },
    {
        "title": "Techniques in Witness Examination in Commercial Trials",
        "type": "Featured",
        "url": "/featured/witness-examination-techniques-commercial-trials/",
        "snippet": "Practical perspective on drafting examination-in-chief affidavits, cross-examination on electronic records under Section 65B, and document admission procedures.",
        "keywords": "techniques in witness examination in commercial trials speaking & recognition practical perspective on drafting examination-in-chief affidavits, cross-examination on electronic records under section 65b, and document admission procedures."
    },
    {
        "title": "Tenancy Disputes & Eviction Grounds under Delhi Rent Control",
        "type": "Featured",
        "url": "/featured/tenancy-disputes-delhi-rent-control-grounds/",
        "snippet": "Key legal considerations in bonafide commercial requirement petitions under Section 14(1)(e) and leave-to-defend standards before Additional Rent Controllers.",
        "keywords": "tenancy disputes & eviction grounds under delhi rent control speaking & recognition key legal considerations in bonafide commercial requirement petitions under section 14(1)(e) and leave-to-defend standards before additional rent controllers."
    },
    {
        "title": "Natural Justice Principles Before Administrative Tribunals",
        "type": "Featured",
        "url": "/featured/natural-justice-principles-administrative-tribunals/",
        "snippet": "Analysis of reasoned speaking orders, procedural fairness, and statutory remedies when administrative authorities pass orders without granting personal hearings.",
        "keywords": "natural justice principles before administrative tribunals speaking & recognition analysis of reasoned speaking orders, procedural fairness, and statutory remedies when administrative authorities pass orders without granting personal hearings."
    },
    {
        "title": "Enforcement of Domestic Arbitral Awards in Delhi High Court",
        "type": "Featured",
        "url": "/featured/enforcement-domestic-arbitral-awards-delhi-high-court/",
        "snippet": "Procedural framework for executing arbitral awards as civil court decrees under Section 36 and navigating post-amendment unconditional stay rules.",
        "keywords": "enforcement of domestic arbitral awards in delhi high court speaking & recognition procedural framework for executing arbitral awards as civil court decrees under section 36 and navigating post-amendment unconditional stay rules."
    },
    {
        "title": "Shilpa Sailesh v. Varun Sreenivasan",
        "type": "Featured",
        "url": "/featured/shilpa-sailesh-v-varun-sreenivasan/",
        "snippet": "Constitution Bench landmark ruling affirming Supreme Court powers under Article 142 to dissolve irretrievably broken marriages without statutory delays.",
        "keywords": "shilpa sailesh v. varun sreenivasan reported judgment constitution bench landmark ruling affirming supreme court powers under article 142 to dissolve irretrievably broken marriages without statutory delays. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Satish Chander Ahuja v. Sneha Ahuja",
        "type": "Featured",
        "url": "/featured/satish-chander-ahuja-v-sneha-ahuja/",
        "snippet": "Supreme Court benchmark judgment establishing a daughter-in-law's statutory right to reside in a shared household under the Protection of Women from Domestic Violence Act.",
        "keywords": "satish chander ahuja v. sneha ahuja reported judgment supreme court benchmark judgment establishing a daughter-in-law's statutory right to reside in a shared household under the protection of women from domestic violence act. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Roxann Sharma v. Arun Sharma",
        "type": "Featured",
        "url": "/featured/roxann-sharma-v-arun-sharma/",
        "snippet": "Authoritative Supreme Court ruling applying Section 6(a) of the Hindu Minority and Guardianship Act regarding custody of infants under five years.",
        "keywords": "roxann sharma v. arun sharma reported judgment authoritative supreme court ruling applying section 6(a) of the hindu minority and guardianship act regarding custody of infants under five years. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Yashita Sahu v. State of Rajasthan",
        "type": "Featured",
        "url": "/featured/yashita-sahu-v-state-of-rajasthan/",
        "snippet": "Supreme Court precedent establishing modern contact rights—including structured physical access and electronic/video visitation—to safeguard child bonding.",
        "keywords": "yashita sahu v. state of rajasthan reported judgment supreme court precedent establishing modern contact rights—including structured physical access and electronic/video visitation—to safeguard child bonding. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Aditi alias Mithi v. Jitesh Sharma",
        "type": "Featured",
        "url": "/featured/aditi-alias-mithi-v-jitesh-sharma/",
        "snippet": "Supreme Court directive mandating strict nationwide trial court adherence to mandatory asset disclosure affidavits in child maintenance proceedings.",
        "keywords": "aditi alias mithi v. jitesh sharma reported judgment supreme court directive mandating strict nationwide trial court adherence to mandatory asset disclosure affidavits in child maintenance proceedings. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Scrutiny of Omnibus Allegations in Matrimonial Criminal Complaints",
        "type": "Featured",
        "url": "/featured/scrutiny-omnibus-allegations-matrimonial-criminal-complaints/",
        "snippet": "Judicial thresholds applied under Section 482 CrPC / Section 528 BNSS by Delhi High Court to quash vague criminal allegations against distant matrimonial relatives.",
        "keywords": "scrutiny of omnibus allegations in matrimonial criminal complaints significant matter judicial thresholds applied under section 482 crpc / section 528 bnss by delhi high court to quash vague criminal allegations against distant matrimonial relatives. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Interim Custody & Holiday Access Schedules in Delhi Family Courts",
        "type": "Featured",
        "url": "/featured/interim-custody-holiday-access-schedules-delhi-courts/",
        "snippet": "Procedural framework under Section 12 of the Guardians and Wards Act governing school vacations, weekend overnight access, and festival visitation arrangements.",
        "keywords": "interim custody & holiday access schedules in delhi family courts significant matter procedural framework under section 12 of the guardians and wards act governing school vacations, weekend overnight access, and festival visitation arrangements. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Evidentiary Burdens in Stridhan Recovery and Section 406 Claims",
        "type": "Featured",
        "url": "/featured/evidentiary-burdens-stridhan-recovery-section-406/",
        "snippet": "Practical application of the Pratibha Rani doctrine distinguishing personal Stridhan property from joint matrimonial possessions in criminal breach of trust claims.",
        "keywords": "evidentiary burdens in stridhan recovery and section 406 claims significant matter practical application of the pratibha rani doctrine distinguishing personal stridhan property from joint matrimonial possessions in criminal breach of trust claims. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Waiver of Six-Month Cooling-Off Period under Section 13B(2)",
        "type": "Featured",
        "url": "/featured/waiver-cooling-off-period-section-13b-hma/",
        "snippet": "Analysis of Delhi Family Court discretion in applying Amardeep Singh standards to waive the statutory cooling-off window where comprehensive settlements are recorded.",
        "keywords": "waiver of six-month cooling-off period under section 13b(2) significant matter analysis of delhi family court discretion in applying amardeep singh standards to waive the statutory cooling-off window where comprehensive settlements are recorded."
    },
    {
        "title": "Enforcement and Execution of Maintenance Decrees Across Forums",
        "type": "Featured",
        "url": "/featured/enforcement-execution-maintenance-decrees-across-forums/",
        "snippet": "Step-by-step procedural analysis of execution under Section 125(3) CrPC / Section 144(3) BNSS, salary attachment, property distress warrants, and limitation bars.",
        "keywords": "enforcement and execution of maintenance decrees across forums publication step-by-step procedural analysis of execution under section 125(3) crpc / section 144(3) bnss, salary attachment, property distress warrants, and limitation bars. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Territorial Jurisdiction in Matrimonial Litigation under Section 19 HMA",
        "type": "Featured",
        "url": "/featured/territorial-jurisdiction-matrimonial-litigation-section-19-hma/",
        "snippet": "Examining jurisdictional options across Delhi courts: place of marriage solemnization, last cohabitation, and wife's current ordinary place of residence.",
        "keywords": "territorial jurisdiction in matrimonial litigation under section 19 hma publication examining jurisdictional options across delhi courts: place of marriage solemnization, last cohabitation, and wife's current ordinary place of residence. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Evolving Trends in Shared Parenting and Joint Guardianship in India",
        "type": "Featured",
        "url": "/featured/shared-parenting-joint-guardianship-trends-india/",
        "snippet": "Review of Law Commission Report 257 recommendations and judicial adoption of shared parenting plans in high-conflict custody litigation.",
        "keywords": "evolving trends in shared parenting and joint guardianship in india publication review of law commission report 257 recommendations and judicial adoption of shared parenting plans in high-conflict custody litigation. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Role of Court-Annexed Mediation in Resolving Matrimonial Disputes",
        "type": "Featured",
        "url": "/featured/role-court-annexed-mediation-matrimonial-disputes/",
        "snippet": "Perspective on mandatory conciliation under Section 9 Family Courts Act, confidentiality of mediation proceedings, and drafting enforceable settlement agreements.",
        "keywords": "role of court-annexed mediation in resolving matrimonial disputes speaking & recognition perspective on mandatory conciliation under section 9 family courts act, confidentiality of mediation proceedings, and drafting enforceable settlement agreements. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Identifying and Addressing Parental Alienation in Custody Battles",
        "type": "Featured",
        "url": "/featured/identifying-addressing-parental-alienation-custody-battles/",
        "snippet": "Discussion on psychological evaluation protocols, child counsellor involvement, and judicial interventions to counter parental alienation in contested divorce.",
        "keywords": "identifying and addressing parental alienation in custody battles speaking & recognition discussion on psychological evaluation protocols, child counsellor involvement, and judicial interventions to counter parental alienation in contested divorce. family law matrimonial divorce child custody maintenance visitation child welfare marriage"
    },
    {
        "title": "Recent Developments in Banking Recovery Proceedings",
        "type": "Insight",
        "url": "/insights/#insight-banking-recovery",
        "snippet": "An overview of statutory security enforcement mechanisms and recent legal precedents shaping rights of secured lenders and borrowers.",
        "keywords": "recent developments in banking recovery proceedings banking & recovery an overview of statutory security enforcement mechanisms and recent legal precedents shaping rights of secured lenders and borrowers."
    },
    {
        "title": "Scope of Section 14 Applications Before Chief Metropolitan Magistrates",
        "type": "Insight",
        "url": "/insights/#insight-section-14-magistrate",
        "snippet": "Analyzing the non-adjudicatory, administrative role of the Chief Metropolitan Magistrate in taking physical possession of secured assets.",
        "keywords": "scope of section 14 applications before chief metropolitan magistrates banking & recovery analyzing the non-adjudicatory, administrative role of the chief metropolitan magistrate in taking physical possession of secured assets. maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Borrowers' Rights and Remedies Against Bank Auction Notices",
        "type": "Insight",
        "url": "/insights/#insight-auction-notice-remedies",
        "snippet": "Procedural safeguards governing reserve prices, 30-day sale notices, and redemption rights prior to property auction.",
        "keywords": "borrowers' rights and remedies against bank auction notices banking & recovery procedural safeguards governing reserve prices, 30-day sale notices, and redemption rights prior to property auction."
    },
    {
        "title": "Limitation and Pre-Deposit Mandates in DRT and DRAT Proceedings",
        "type": "Insight",
        "url": "/insights/#insight-drt-limitation-appeals",
        "snippet": "Navigating strict limitation windows and mandatory pre-deposit conditions under Section 18 for appellate relief.",
        "keywords": "limitation and pre-deposit mandates in drt and drat proceedings banking & recovery navigating strict limitation windows and mandatory pre-deposit conditions under section 18 for appellate relief."
    },
    {
        "title": "NPA Classification Norms and RBI Prudential Framework",
        "type": "Insight",
        "url": "/insights/#insight-npa-classification-norms",
        "snippet": "Examining standard 90-day overdue rules, circular requirements, and legal challenges to premature NPA declarations.",
        "keywords": "npa classification norms and rbi prudential framework banking & recovery examining standard 90-day overdue rules, circular requirements, and legal challenges to premature npa declarations."
    },
    {
        "title": "Key Considerations in Commercial Dispute Resolution",
        "type": "Insight",
        "url": "/insights/#insight-commercial-disputes-res",
        "snippet": "A practical look at strategies, expedited procedural timelines, and important precedents under the Commercial Courts Act.",
        "keywords": "key considerations in commercial dispute resolution civil & commercial a practical look at strategies, expedited procedural timelines, and important precedents under the commercial courts act."
    },
    {
        "title": "Summary Suits under Order XXXVII CPC: Expedited Debt Recovery",
        "type": "Insight",
        "url": "/insights/#insight-order-37-summary-suits",
        "snippet": "Leveraging summary suits for liquidated debts founded on written contracts, bills of exchange, and promissory notes.",
        "keywords": "summary suits under order xxxvii cpc: expedited debt recovery civil & commercial leveraging summary suits for liquidated debts founded on written contracts, bills of exchange, and promissory notes."
    },
    {
        "title": "Interim Injunctions under Order XXXIX CPC: The Threefold Test",
        "type": "Insight",
        "url": "/insights/#insight-interim-injunctions-cpc",
        "snippet": "Analyzing the fundamental legal principles required to obtain or resist temporary restraining orders during civil litigation.",
        "keywords": "interim injunctions under order xxxix cpc: the threefold test civil & commercial analyzing the fundamental legal principles required to obtain or resist temporary restraining orders during civil litigation."
    },
    {
        "title": "Rejection of Plaint under Order VII Rule 11 CPC",
        "type": "Insight",
        "url": "/insights/#insight-rejection-plaint-order7",
        "snippet": "Strategic grounds for seeking dismissal of unmerited civil actions at the threshold for lack of cause of action or legal bar.",
        "keywords": "rejection of plaint under order vii rule 11 cpc civil & commercial strategic grounds for seeking dismissal of unmerited civil actions at the threshold for lack of cause of action or legal bar."
    },
    {
        "title": "Law of Limitation in Contractual and Commercial Claims",
        "type": "Insight",
        "url": "/insights/#insight-limitation-contract-claims",
        "snippet": "Understanding the 3-year limitation clock, triggers of cause of action, and written acknowledgments under Section 18 of the Limitation Act.",
        "keywords": "law of limitation in contractual and commercial claims civil & commercial understanding the 3-year limitation clock, triggers of cause of action, and written acknowledgments under section 18 of the limitation act."
    },
    {
        "title": "Title Verification and Due Diligence in Property Transactions",
        "type": "Insight",
        "url": "/insights/#insight-property-transactions",
        "snippet": "Important procedural checks, legal considerations, and common pitfalls in property transactions and title verification across Delhi & NCR.",
        "keywords": "title verification and due diligence in property transactions property law important procedural checks, legal considerations, and common pitfalls in property transactions and title verification across delhi & ncr."
    },
    {
        "title": "Specific Performance of Agreements to Sell Immovable Property",
        "type": "Insight",
        "url": "/insights/#insight-specific-performance-property",
        "snippet": "How the amended Specific Relief Act enforces contractual completion of real estate sales over monetary damages.",
        "keywords": "specific performance of agreements to sell immovable property property law how the amended specific relief act enforces contractual completion of real estate sales over monetary damages."
    },
    {
        "title": "Partition Suits: Ancestral Property Rights and Coparcenary Shares",
        "type": "Insight",
        "url": "/insights/#insight-partition-ancestral-property",
        "snippet": "Determining shares in Hindu Undivided Family estates, daughter coparcenary rights under Vineeta Sharma, and preliminary decree stages.",
        "keywords": "partition suits: ancestral property rights and coparcenary shares property law determining shares in hindu undivided family estates, daughter coparcenary rights under vineeta sharma, and preliminary decree stages."
    },
    {
        "title": "Protecting Lawful Possession: Injunction Suits Against Dispossession",
        "type": "Insight",
        "url": "/insights/#insight-injunction-possession-protection",
        "snippet": "Judicial protection against forcible dispossession and the requirement of 'due process of law' even against true owners.",
        "keywords": "protecting lawful possession: injunction suits against dispossession property law judicial protection against forcible dispossession and the requirement of 'due process of law' even against true owners."
    },
    {
        "title": "Compulsory Registration and Transfer of Immovable Property",
        "type": "Insight",
        "url": "/insights/#insight-registration-transfer-deeds",
        "snippet": "Section 17 Registration Act compliance, consequences of unregistered sale agreements, and part-performance under Section 53A.",
        "keywords": "compulsory registration and transfer of immovable property property law section 17 registration act compliance, consequences of unregistered sale agreements, and part-performance under section 53a."
    },
    {
        "title": "Understanding Section 138 NI Act Cheque Dishonour Prosecutions",
        "type": "Insight",
        "url": "/insights/#insight-ni-act",
        "snippet": "An overview of legal issues, procedural requirements, demand notice timelines, and trial stages in cheque dishonour cases.",
        "keywords": "understanding section 138 ni act cheque dishonour prosecutions criminal & ni act an overview of legal issues, procedural requirements, demand notice timelines, and trial stages in cheque dishonour cases."
    },
    {
        "title": "Rebutting the Statutory Presumption under Section 139 NI Act",
        "type": "Insight",
        "url": "/insights/#insight-section-139-presumption",
        "snippet": "Evidentiary standards for discharging the reverse burden of proof on existence of legally enforceable debt.",
        "keywords": "rebutting the statutory presumption under section 139 ni act criminal & ni act evidentiary standards for discharging the reverse burden of proof on existence of legally enforceable debt."
    },
    {
        "title": "Vicarious Liability of Company Directors under Section 141 NI Act",
        "type": "Insight",
        "url": "/insights/#insight-directors-liability-141",
        "snippet": "Specific pleading thresholds required to summon non-signatory directors in corporate cheque dishonour complaints.",
        "keywords": "vicarious liability of company directors under section 141 ni act criminal & ni act specific pleading thresholds required to summon non-signatory directors in corporate cheque dishonour complaints."
    },
    {
        "title": "Anticipatory Bail Jurisprudence under Bharatiya Nagarik Suraksha Sanhita",
        "type": "Insight",
        "url": "/insights/#insight-anticipatory-bail-bnss",
        "snippet": "Balancing personal liberty under Article 21 with investigative prerogatives in pre-arrest bail applications.",
        "keywords": "anticipatory bail jurisprudence under bharatiya nagarik suraksha sanhita criminal & ni act balancing personal liberty under article 21 with investigative prerogatives in pre-arrest bail applications."
    },
    {
        "title": "Quashing FIRs and Criminal Complaints under Inherent Powers",
        "type": "Insight",
        "url": "/insights/#insight-fir-quashing-high-court",
        "snippet": "Applying Bhajan Lal parameters to prevent abuse of judicial process in purely civil or matrimonial disputes.",
        "keywords": "quashing firs and criminal complaints under inherent powers criminal & ni act applying bhajan lal parameters to prevent abuse of judicial process in purely civil or matrimonial disputes. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Remand Proceedings and Accused Rights during Police Custody",
        "type": "Insight",
        "url": "/insights/#insight-remand-custody-safeguards",
        "snippet": "Judicial scrutiny of Section 41A CrPC notice compliance and rights to legal representation during police remand.",
        "keywords": "remand proceedings and accused rights during police custody criminal & ni act judicial scrutiny of section 41a crpc notice compliance and rights to legal representation during police remand. child custody custody child welfare visitation rights parental access guardianship children family court maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Invoking Article 226: Principles Governing Writ of Mandamus",
        "type": "Insight",
        "url": "/insights/#insight-writ-petitions",
        "snippet": "An overview of constitutional remedies, the enforcement of public duties, and standards for seeking judicial review.",
        "keywords": "invoking article 226: principles governing writ of mandamus constitutional & writ an overview of constitutional remedies, the enforcement of public duties, and standards for seeking judicial review."
    },
    {
        "title": "Judicial Review of Administrative Actions: The Wednesbury Standard",
        "type": "Insight",
        "url": "/insights/#insight-administrative-arbitrariness",
        "snippet": "Examining irrationality, proportionality, and procedural impropriety in government tender and regulatory orders.",
        "keywords": "judicial review of administrative actions: the wednesbury standard constitutional & writ examining irrationality, proportionality, and procedural impropriety in government tender and regulatory orders."
    },
    {
        "title": "Challenging Show Cause Notices: Exceptional Writ Thresholds",
        "type": "Insight",
        "url": "/insights/#insight-quashing-show-cause-notices",
        "snippet": "When High Courts will entertain writ petitions against show cause notices before final administrative orders are passed.",
        "keywords": "challenging show cause notices: exceptional writ thresholds constitutional & writ when high courts will entertain writ petitions against show cause notices before final administrative orders are passed."
    },
    {
        "title": "Right to Speedy Trial as a Fundamental Guarantee under Article 21",
        "type": "Insight",
        "url": "/insights/#insight-speedy-trial-article-21",
        "snippet": "Examining judicial directives granting bail or quashing proceedings where trials suffer systemic, unjustified delays.",
        "keywords": "right to speedy trial as a fundamental guarantee under article 21 constitutional & writ examining judicial directives granting bail or quashing proceedings where trials suffer systemic, unjustified delays. stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "The Pillars of Natural Justice: Audi Alteram Partem and Nemo Judex",
        "type": "Insight",
        "url": "/insights/#insight-natural-justice-bias-rule",
        "snippet": "The twin principles of procedural fairness and the requirement of reasoned speaking orders in statutory decisions.",
        "keywords": "the pillars of natural justice: audi alteram partem and nemo judex constitutional & writ the twin principles of procedural fairness and the requirement of reasoned speaking orders in statutory decisions."
    },
    {
        "title": "Securing Pre-Arbitral Interim Measures under Section 9",
        "type": "Insight",
        "url": "/insights/#insight-arbitration",
        "snippet": "Examining judicial standards for preserving assets, restraining bank guarantees, and timing of arbitral tribunal constitution.",
        "keywords": "securing pre-arbitral interim measures under section 9 arbitration examining judicial standards for preserving assets, restraining bank guarantees, and timing of arbitral tribunal constitution. maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Court Appointment of Arbitrators under Section 11(6)",
        "type": "Insight",
        "url": "/insights/#insight-section-11-arbitrator-appointment",
        "snippet": "Understanding the prima facie threshold of examining the existence of an arbitration agreement under Section 11(6A).",
        "keywords": "court appointment of arbitrators under section 11(6) arbitration understanding the prima facie threshold of examining the existence of an arbitration agreement under section 11(6a)."
    },
    {
        "title": "Grounds for Setting Aside Arbitral Awards under Section 34",
        "type": "Insight",
        "url": "/insights/#insight-section-34-setting-aside-award",
        "snippet": "Analyzing the patent illegality standard, public policy challenges, and non-interference with tribunal factual findings.",
        "keywords": "grounds for setting aside arbitral awards under section 34 arbitration analyzing the patent illegality standard, public policy challenges, and non-interference with tribunal factual findings."
    },
    {
        "title": "Enforcement and Execution of Arbitral Awards under Section 36",
        "type": "Insight",
        "url": "/insights/#insight-section-36-enforcement-awards",
        "snippet": "The automatic stay regime post-amendment and requirements for obtaining stay of award execution upon security deposit.",
        "keywords": "enforcement and execution of arbitral awards under section 36 arbitration the automatic stay regime post-amendment and requirements for obtaining stay of award execution upon security deposit."
    },
    {
        "title": "Seat versus Venue in Commercial Arbitration Agreements",
        "type": "Insight",
        "url": "/insights/#insight-seat-versus-venue-arbitration",
        "snippet": "How defining the juridical seat fixes supervisory court jurisdiction and prevents jurisdictional conflicts.",
        "keywords": "seat versus venue in commercial arbitration agreements arbitration how defining the juridical seat fixes supervisory court jurisdiction and prevents jurisdictional conflicts."
    },
    {
        "title": "Child Custody Jurisprudence: The Paramount Welfare Principle",
        "type": "Insight",
        "url": "/insights/child-custody-welfare-of-child/",
        "snippet": "Why the welfare of the minor child supersedes statutory parental claims in custody and guardianship contests.",
        "keywords": "child custody jurisprudence: the paramount welfare principle family & matrimonial why the welfare of the minor child supersedes statutory parental claims in custody and guardianship contests. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Statutory Maintenance Principles and Income Affidavits",
        "type": "Insight",
        "url": "/insights/maintenance-under-bnss/",
        "snippet": "Guidelines established in Enish Malhotra regarding mandatory financial disclosure affidavits in matrimonial disputes.",
        "keywords": "statutory maintenance principles and income affidavits family & matrimonial guidelines established in enish malhotra regarding mandatory financial disclosure affidavits in matrimonial disputes. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Cruelty as a Matrimonial Ground: Legal Standards and Precedents",
        "type": "Insight",
        "url": "/insights/cruelty-under-bns/",
        "snippet": "Distinguishing ordinary wear and tear of married life from sustained mental cruelty justifying dissolution of marriage.",
        "keywords": "cruelty as a matrimonial ground: legal standards and precedents family & matrimonial distinguishing ordinary wear and tear of married life from sustained mental cruelty justifying dissolution of marriage. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Mutual Consent Divorce and Waiver of the Statutory Cooling-Off Period",
        "type": "Insight",
        "url": "/insights/#insight-mutual-consent-cooling-off",
        "snippet": "Procedural pathways under Section 13B and judicial discretion to waive the 6-month statutory waiting period under Amardeep Singh.",
        "keywords": "mutual consent divorce and waiver of the statutory cooling-off period family & matrimonial procedural pathways under section 13b and judicial discretion to waive the 6-month statutory waiting period under amardeep singh. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Motor Accident Claims (MACT): Determining Just Compensation",
        "type": "Insight",
        "url": "/insights/#insight-mact-compensation-principles",
        "snippet": "Analyzing the multiplier method, future prospects additions, and third-party insurer liability under the Motor Vehicles Act.",
        "keywords": "motor accident claims (mact): determining just compensation accident & consumer analyzing the multiplier method, future prospects additions, and third-party insurer liability under the motor vehicles act."
    },
    {
        "title": "Irretrievable Breakdown of Marriage: Article 142 Powers Explained",
        "type": "Insight",
        "url": "/insights/irretrievable-breakdown-of-marriage/",
        "snippet": "Analysis of the Constitution Bench ruling in Shilpa Sailesh, key factors determining irretrievable breakdown, and limitations on lower courts.",
        "keywords": "irretrievable breakdown of marriage: article 142 powers explained family & matrimonial analysis of the constitution bench ruling in shilpa sailesh, key factors determining irretrievable breakdown, and limitations on lower courts. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Right of Residence in a Shared Household under the Domestic Violence Act",
        "type": "Insight",
        "url": "/insights/#insight-shared-household-dv",
        "snippet": "How Satish Chander Ahuja and Prabha Tyagi expanded residence protection for wives even in properties solely owned by in-laws.",
        "keywords": "right of residence in a shared household under the domestic violence act family & matrimonial how satish chander ahuja and prabha tyagi expanded residence protection for wives even in properties solely owned by in-laws. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Overlapping Maintenance Claims: The Harmonization Rules in Rajnesh v. Neha",
        "type": "Insight",
        "url": "/insights/#insight-overlapping-maintenance-rajnesh",
        "snippet": "Rules governing simultaneous maintenance claims under HMA Section 24, DV Act Section 20, and CrPC 125 / BNSS 144.",
        "keywords": "overlapping maintenance claims: the harmonization rules in rajnesh v. neha family & matrimonial rules governing simultaneous maintenance claims under hma section 24, dv act section 20, and crpc 125 / bnss 144. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Custody of Children Below Five Years: The Maternal Preference Principle",
        "type": "Insight",
        "url": "/insights/#insight-infant-custody-roxann-sharma",
        "snippet": "Analyzing Section 6(a) of the Hindu Minority and Guardianship Act and exceptions established in Roxann Sharma v. Arun Sharma.",
        "keywords": "custody of children below five years: the maternal preference principle family & matrimonial analyzing section 6(a) of the hindu minority and guardianship act and exceptions established in roxann sharma v. arun sharma. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Electronic Contact Rights & Virtual Visitation in Matrimonial Disputes",
        "type": "Insight",
        "url": "/insights/visitation-rights-during-divorce/",
        "snippet": "The Supreme Court's recognition of structured video calls, telephonic access, and contact rights in Yashita Sahu v. State of Rajasthan.",
        "keywords": "electronic contact rights & virtual visitation in matrimonial disputes family & matrimonial the supreme court's recognition of structured video calls, telephonic access, and contact rights in yashita sahu v. state of rajasthan. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Stridhan Entrustment, Ownership and Recovery under Criminal Law",
        "type": "Insight",
        "url": "/insights/#insight-stridhan-criminal-breach",
        "snippet": "Pratibha Rani v. Suraj Kumar doctrine: Why Stridhan remains absolute property of the woman and refusal to return constitutes criminal breach of trust.",
        "keywords": "stridhan entrustment, ownership and recovery under criminal law family & matrimonial pratibha rani v. suraj kumar doctrine: why stridhan remains absolute property of the woman and refusal to return constitutes criminal breach of trust. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Where Can a Matrimonial Petition Be Filed? Understanding Section 19 HMA",
        "type": "Insight",
        "url": "/insights/#insight-jurisdiction-section-19-hma",
        "snippet": "Exploring statutory territorial forums under the Hindu Marriage Act, with special focus on the wife's place of residence.",
        "keywords": "where can a matrimonial petition be filed? understanding section 19 hma family & matrimonial exploring statutory territorial forums under the hindu marriage act, with special focus on the wife's place of residence. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Parental Alienation in Custody Disputes: Judicial Remedies and Safeguards",
        "type": "Insight",
        "url": "/insights/#insight-parental-alienation-syndrome",
        "snippet": "How courts identify psychological manipulation of children by a custodial parent and modify custody orders to preserve bonding.",
        "keywords": "parental alienation in custody disputes: judicial remedies and safeguards family & matrimonial how courts identify psychological manipulation of children by a custodial parent and modify custody orders to preserve bonding. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Execution and Recovery of Maintenance Arrears: Timelines and Enforcement",
        "type": "Insight",
        "url": "/insights/#insight-execution-maintenance-bnss",
        "snippet": "Navigating the 1-year limitation bar for execution applications, salary attachment, and distress warrants under Section 144 BNSS.",
        "keywords": "execution and recovery of maintenance arrears: timelines and enforcement family & matrimonial navigating the 1-year limitation bar for execution applications, salary attachment, and distress warrants under section 144 bnss. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Child Maintenance Obligations: Assessing Parental Income and Capacity",
        "type": "Insight",
        "url": "/insights/#insight-interim-maintenance-aditi-mithi",
        "snippet": "Supreme Court principles affirming that both parents share maintenance burdens, but working mothers do not extinguish fathers' primary duty.",
        "keywords": "child maintenance obligations: assessing parental income and capacity family & matrimonial supreme court principles affirming that both parents share maintenance burdens, but working mothers do not extinguish fathers' primary duty. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b maintenance alimony interim maintenance section 144 bnss section 125 crpc financial disclosure asset affidavit support stridhan criminal breach of trust section 498a section 85 bns section 86 bns fir quashing matrimonial criminal"
    },
    {
        "title": "Annulment vs. Divorce: Grounds for Declaring Marriage Void or Voidable",
        "type": "Insight",
        "url": "/insights/#insight-annulment-voidable-marriages",
        "snippet": "Distinguishing void marriages under Section 11 from voidable marriages under Section 12 of the Hindu Marriage Act.",
        "keywords": "annulment vs. divorce: grounds for declaring marriage void or voidable family & matrimonial distinguishing void marriages under section 11 from voidable marriages under section 12 of the hindu marriage act. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Disposal of Joint Matrimonial Property under Section 27 HMA",
        "type": "Insight",
        "url": "/insights/#insight-joint-property-section-27-hma",
        "snippet": "How Family Courts exercise jurisdiction over property presented at or about the time of marriage belonging jointly to spouses.",
        "keywords": "disposal of joint matrimonial property under section 27 hma family & matrimonial how family courts exercise jurisdiction over property presented at or about the time of marriage belonging jointly to spouses. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Restitution of Conjugal Rights (Section 9 HMA): Purpose, Defense and Impact",
        "type": "Insight",
        "url": "/insights/#insight-restitution-conjugal-rights-9",
        "snippet": "Understanding 'reasonable excuse' for withdrawal from society and how non-restitution leads to divorce under Section 13(1A)(ii).",
        "keywords": "restitution of conjugal rights (section 9 hma): purpose, defense and impact family & matrimonial understanding 'reasonable excuse' for withdrawal from society and how non-restitution leads to divorce under section 13(1a)(ii). divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Mandatory Reconciliation & Family Court Counselling Mechanisms",
        "type": "Insight",
        "url": "/insights/#insight-family-court-counselling-mediation",
        "snippet": "Statutory mandates under Section 9 of the Family Courts Act 1984 directing judges and counsellors to endeavor for amicable reconciliation.",
        "keywords": "mandatory reconciliation & family court counselling mechanisms family & matrimonial statutory mandates under section 9 of the family courts act 1984 directing judges and counsellors to endeavor for amicable reconciliation. divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    },
    {
        "title": "Structuring Interim Visitation Schedules: Practical Principles in Delhi Courts",
        "type": "Insight",
        "url": "/insights/#insight-interim-custody-visitation-protocols",
        "snippet": "Practical criteria used by courts to design weekend visitation, children's complex meetings, festival sharing, and summer vacation access.",
        "keywords": "structuring interim visitation schedules: practical principles in delhi courts family & matrimonial practical criteria used by courts to design weekend visitation, children's complex meetings, festival sharing, and summer vacation access. child custody custody child welfare visitation rights parental access guardianship children family court divorce marriage matrimonial dispute mental cruelty domestic dispute separation mutual consent section 13b"
    }
];

    let searchOverlay = null;
    let searchInput = null;
    let searchResults = null;
    let activeIndex = -1;

    const createSearchUI = () => {
        if (searchOverlay) return;

        searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.hidden = true;

        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Site Search');

        const header = document.createElement('div');
        header.className = 'search-header';

        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search legal topics, insights, judgments, courts...';
        searchInput.setAttribute('aria-label', 'Search website');
        searchInput.autocomplete = 'off';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'search-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Close search');
        closeBtn.textContent = '×';

        header.appendChild(searchInput);
        header.appendChild(closeBtn);

        searchResults = document.createElement('ul');
        searchResults.className = 'search-results';
        searchResults.setAttribute('aria-live', 'polite');

        modal.appendChild(header);
        modal.appendChild(searchResults);
        searchOverlay.appendChild(modal);
        document.body.appendChild(searchOverlay);

        const style = document.createElement('style');
        style.textContent = `
            .search-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.75);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding-top: 8vh;
            }
            .search-overlay[hidden] {
                display: none !important;
            }
            .search-modal {
                background: #ffffff;
                width: 92%;
                max-width: 640px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                max-height: 82vh;
            }
            .search-header {
                display: flex;
                border-bottom: 1px solid #e2e8f0;
                padding: 0.85rem 1.15rem;
                align-items: center;
                background: #fafafa;
                gap: 0.5rem;
            }
            .search-input {
                flex: 1;
                border: none;
                font-size: 1.05rem;
                outline: none;
                padding: 0.4rem;
                background: transparent;
                color: #1a1a1a;
                font-family: inherit;
            }
            .search-close {
                background: none;
                border: none;
                font-size: 1.75rem;
                line-height: 1;
                cursor: pointer;
                padding: 0 0.5rem;
                color: #64748b;
                transition: color 0.15s ease;
            }
            .search-close:hover,
            .search-close:focus {
                color: #6f1d2a;
                outline: none;
            }
            .search-results {
                list-style: none;
                padding: 0;
                margin: 0;
                overflow-y: auto;
                max-height: 62vh;
            }
            .search-result-item {
                border-bottom: 1px solid #f1f5f9;
            }
            .search-result-link {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 0.85rem 1.15rem;
                color: #1e293b;
                text-decoration: none;
                gap: 1rem;
                transition: background 0.15s ease, color 0.15s ease;
            }
            .search-result-link:hover,
            .search-result-link:focus,
            .search-result-link.is-focused {
                background: #fdf2f4;
                outline: 2px solid #6f1d2a;
                outline-offset: -2px;
            }
            .search-result-text {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                flex: 1;
                min-width: 0;
            }
            .search-result-title {
                font-weight: 600;
                font-size: 0.95rem;
                color: #0f172a;
                line-height: 1.35;
            }
            .search-result-link:hover .search-result-title,
            .search-result-link:focus .search-result-title {
                color: #6f1d2a;
            }
            .search-result-snippet {
                font-size: 0.82rem;
                color: #64748b;
                line-height: 1.35;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .search-result-badge {
                font-size: 0.72rem;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                padding: 0.22rem 0.55rem;
                border-radius: 4px;
                font-weight: 600;
                white-space: nowrap;
                align-self: flex-start;
                background: #f1f5f9;
                color: #475569;
            }
            .search-result-badge--insight {
                background: #eef2ff;
                color: #3730a3;
            }
            .search-result-badge--featured {
                background: #fef3c7;
                color: #92400e;
            }
            .search-result-badge--practice-area {
                background: #fdf2f4;
                color: #6f1d2a;
            }
            .search-result-badge--court {
                background: #ecfdf5;
                color: #065f46;
            }
            .search-result-badge--page {
                background: #f8fafc;
                color: #64748b;
            }
            .search-no-results {
                padding: 2.25rem 1.5rem;
                color: #64748b;
                text-align: center;
                font-size: 0.95rem;
            }
        `;
        document.head.appendChild(style);

        closeBtn.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (searchOverlay.hidden) return;

            if (e.key === 'Escape') {
                closeSearch();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateResults(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateResults(-1);
            }
        });

        searchInput.addEventListener('input', handleSearch);
    };

    const navigateResults = (direction) => {
        const links = searchResults.querySelectorAll('.search-result-link');
        if (!links.length) return;

        activeIndex += direction;
        if (activeIndex >= links.length) activeIndex = 0;
        if (activeIndex < 0) {
            activeIndex = -1;
            searchInput.focus();
            return;
        }

        links.forEach((l, i) => l.classList.toggle('is-focused', i === activeIndex));
        links[activeIndex].focus();
    };

    const scoreItem = (item, query) => {
        const titleLower = item.title.toLowerCase();
        const snippetLower = (item.snippet || '').toLowerCase();
        const kwLower = (item.keywords || '').toLowerCase();
        const typeLower = item.type.toLowerCase();

        let score = 0;
        if (titleLower === query) score += 120;
        else if (titleLower.startsWith(query)) score += 90;
        else if (titleLower.includes(query)) score += 70;

        if (kwLower.includes(query)) score += 40;
        if (snippetLower.includes(query)) score += 30;
        if (typeLower.includes(query)) score += 20;

        // Check individual tokens
        const tokens = query.split(/\s+/).filter(t => t.length > 1);
        if (tokens.length > 1) {
            let allMatch = true;
            for (const t of tokens) {
                if (!titleLower.includes(t) && !kwLower.includes(t) && !snippetLower.includes(t)) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) score += 35;
        }

        return score;
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        activeIndex = -1;

        if (!query) return;

        const scored = [];
        for (const item of siteIndex) {
            const score = scoreItem(item, query);
            if (score > 0) {
                scored.push({ item, score });
            }
        }

        scored.sort((a, b) => b.score - a.score);
        const matches = scored.slice(0, 20).map(s => s.item);

        if (matches.length === 0) {
            const noRes = document.createElement('li');
            noRes.className = 'search-no-results';
            noRes.textContent = 'No matching results found for "' + e.target.value.trim() + '". Try searching for custody, divorce, SARFAESI, arbitration, or courts.';
            searchResults.appendChild(noRes);
            return;
        }

        matches.forEach(match => {
            const li = document.createElement('li');
            li.className = 'search-result-item';

            const a = document.createElement('a');
            a.href = match.url;
            a.className = 'search-result-link';

            const textDiv = document.createElement('div');
            textDiv.className = 'search-result-text';

            const titleSpan = document.createElement('span');
            titleSpan.className = 'search-result-title';
            titleSpan.textContent = match.title;
            textDiv.appendChild(titleSpan);

            if (match.snippet) {
                const descSpan = document.createElement('span');
                descSpan.className = 'search-result-snippet';
                descSpan.textContent = match.snippet;
                textDiv.appendChild(descSpan);
            }

            const badgeSpan = document.createElement('span');
            const typeClass = match.type.toLowerCase().replace(/\s+/g, '-');
            badgeSpan.className = 'search-result-badge search-result-badge--' + typeClass;
            badgeSpan.textContent = match.type;

            a.appendChild(textDiv);
            a.appendChild(badgeSpan);
            li.appendChild(a);
            searchResults.appendChild(li);
        });
    };

    let lastActiveElement = null;

    const openSearch = () => {
        lastActiveElement = document.activeElement;
        createSearchUI();
        searchOverlay.hidden = false;
        searchInput.value = '';
        searchResults.innerHTML = '';
        activeIndex = -1;
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
        if (searchOverlay) {
            searchOverlay.hidden = true;
            document.body.style.overflow = '';
            if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
                lastActiveElement.focus();
            }
        }
    };

    searchButtons.forEach(btn => btn.addEventListener('click', openSearch));
})();

// ==========================================================================
// CONTACT FORM HANDLER
// ==========================================================================
(() => {
    const contactForm = document.querySelector("[data-contact-form]");
    const contactStatus = document.querySelector("[data-contact-status]");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!contactForm.reportValidity()) return;

        const name = (contactForm.querySelector("#contact-name")?.value || "").trim();
        const email = (contactForm.querySelector("#contact-email")?.value || "").trim();
        const phone = (contactForm.querySelector("#contact-phone")?.value || "").trim();
        const subjectValue = (contactForm.querySelector("#contact-subject")?.value || "").trim();
        const message = (contactForm.querySelector("#contact-message")?.value || "").trim();

        const mailSubject = encodeURIComponent(`[Legal Consultation Request] ${subjectValue} - ${name} (Sunil Kumar Upadhyay)`);
        const mailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || "Not provided"}\n` +
            `Subject: ${subjectValue}\n\n` +
            `Message:\n${message}\n`
        );

        if (contactStatus) {
            contactStatus.textContent = "Your email application has opened with your message prepared. Please click 'Send' in your email client to dispatch your inquiry.";
            contactStatus.style.color = "var(--color-burgundy, #6f1d2a)";
            contactStatus.style.fontWeight = "600";
            contactStatus.style.marginTop = "0.75rem";
        }

        window.location.href = `mailto:Sunilupadhayay5@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
})();
