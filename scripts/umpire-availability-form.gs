/**
 * Cricket NL — Fall Indoor League 2026
 * Creates the "Umpire Availability" Google Form and a linked response spreadsheet.
 *
 * How to use:
 *   1. Go to https://script.google.com and click "New project".
 *   2. Delete the sample code, paste this whole file in, and click Save.
 *   3. Pick "createUmpireAvailabilityForm" in the function dropdown and click Run.
 *   4. Approve the permissions prompt (the script only creates a form and a sheet in your Drive).
 *   5. Open "Execution log": it prints the link to share with umpires, the edit link,
 *      and the responses spreadsheet link.
 *
 * Run it once — each run creates a new form.
 */

const UMPIRES = [
  'Saad (BD Power)', 'Joyel (BD Power)',
  'Aman (NL Wolves)', 'Aryan (NL Wolves)',
  'Irtiza Dar (NL Stars)',
  'Vraj (NSK)',
  'Mothee (Renegades)', 'Samba (Renegades)',
  'Rohit (Indian Strikers)', 'Abhinandan (Indian Strikers)',
  'Sintesh Anto (Golden Maples Malayalee CC)', 'Blesson (Golden Maples Malayalee CC)',
  'Madusanka Bandara (NL Lions)', 'Gimhana Liyanage (NL Lions)',
  'Mandy (NL Hunters)',
  'Abubakar (Gladiators)', 'Mohad (Gladiators)',
  'Midhun Krishnan (Kerala CC)', 'Jobin Joseph (Kerala CC)',
  'Arnab (NL Hurricanes)', 'Zidan (NL Hurricanes)',
  'Bikramjeet Singh (Panjab Warriors)', 'Arsh Gill (Panjab Warriors)',
  'Efaz (NL Cobras)', 'Simoon (NL Cobras)', 'Rafid (NL Cobras)',
  'Wajid (NL Eagles)', 'Nidal (NL Eagles)',
];
const NOT_LISTED = 'My name is not listed';

const SAT_SLOTS = ['7:00–8:00 PM', '8:00–9:00 PM', '9:00–10:00 PM', '10:00–11:00 PM'];
const SUN_SLOTS = ['4:00–5:00 PM', '5:00–6:00 PM'];

// Every match day and its time slots, matching the dashboard schedule (30 slots).
const MATCH_DAYS = [
  { day: 'Sat, Nov 14', slots: SAT_SLOTS },
  { day: 'Sun, Nov 15', slots: SUN_SLOTS },
  { day: 'Sat, Nov 21', slots: SAT_SLOTS },
  { day: 'Sun, Nov 22', slots: SUN_SLOTS },
  { day: 'Sat, Nov 28', slots: SAT_SLOTS },
  { day: 'Sun, Nov 29', slots: SUN_SLOTS },
  { day: 'Sat, Dec 5',  slots: SAT_SLOTS },
  { day: 'Sun, Dec 6',  slots: SUN_SLOTS },
  { day: 'Sun, Dec 13', slots: SUN_SLOTS },
  { day: 'Sat, Dec 19', slots: ['7:00–8:00 PM', '8:00–9:00 PM', '9:00–10:00 PM (Semi-finals)', '10:00–11:00 PM (Final)'] },
];
const NOT_AVAILABLE = 'Not available this day';

function createUmpireAvailabilityForm() {
  const title = 'Cricket NL Fall Indoor League 2026 – Umpire Availability';
  const form = FormApp.create(title);

  form.setDescription(
    'PowerPlex, 90 Crosbie Rd, St. John\'s · Nov 14 – Dec 19, 2026\n\n' +
    'Please tick every time slot you are available to umpire. ' +
    'You will never be assigned to your own team\'s matches, so you can tick slots ' +
    'even when your team is playing that day.\n\n' +
    'You can edit your response later if your availability changes.'
  );
  form.setAllowResponseEdits(true);
  form.setCollectEmail(false);
  form.setConfirmationMessage('Thanks! Your availability has been recorded. Assignments will be shared once all responses are in.');

  // ── About you ──
  form.addListItem()
    .setTitle('Your name')
    .setHelpText('Choose your name. If it is not in the list, pick "' + NOT_LISTED + '" and fill in the next question.')
    .setChoiceValues(UMPIRES.concat([NOT_LISTED]))
    .setRequired(true);

  form.addTextItem()
    .setTitle('If your name is not listed: your full name and team');

  // ── Availability ──
  form.addPageBreakItem()
    .setTitle('Availability')
    .setHelpText('For each match day, tick every slot you can umpire, or "' + NOT_AVAILABLE + '".');

  MATCH_DAYS.forEach(function (d) {
    form.addCheckboxItem()
      .setTitle(d.day)
      .setChoiceValues(d.slots.concat([NOT_AVAILABLE]))
      .setRequired(true);
  });

  form.addMultipleChoiceItem()
    .setTitle('Most matches you are willing to umpire in one day')
    .setChoiceValues(['1', '2', '3', '4'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything else we should know? (optional)');

  // ── Responses spreadsheet ──
  const sheet = SpreadsheetApp.create(title + ' (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link with umpires: ' + form.getPublishedUrl());
  Logger.log('Edit the form:               ' + form.getEditUrl());
  Logger.log('Responses spreadsheet:       ' + sheet.getUrl());
}
