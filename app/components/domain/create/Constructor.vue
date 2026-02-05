<script setup lang="ts">
const {isOpen, open, close} = useModal();
const {poll, addQuestion, updatePoll, saveDraft, sendPollOnServer} = usePollState();
</script>

<template>
    <div class="constructor">
        <h3 class="constructor__title block-title">Constructor</h3>
        <div class="constructor__input-property">
            <label class="constructor__input-property-name" for="poll_title">
                Poll name
            </label>
            <UiMyInput :model-value="poll.title" @update:model-value="(value) => updatePoll({title: value.toString()})" type="text" placeholder="Write the name here..." custom-class="constructor__input-elem" id="poll_title"/>
        </div>
        <div class="constructor__input-property">
            <label class="constructor__input-property-name" for="poll_desc">
                Poll description
            </label>
            <UiMyTextarea :model-value="poll.description" @update:model-value="(value) => updatePoll({description: value.toString()})" placeholder="Write the description here..." class="constructor__input-elem" id="poll_desc" />
            <!-- <UiMyInput :model-value="poll.description" @update:model-value="(value) => updatePoll({description: value.toString()})" type="text" placeholder="Write the description here..." custom-class="constructor__input-elem" id="poll_desc"/> -->
        </div>
        <div class="constructor__questions">
            <p class="constructor__questions-notation">Poll Questions</p>
            <div class="constructor__question-list-zero" v-if="poll.questions.length === 0">
                There are no questions in the survey. You can add them using the button below.
            </div>
            <ul v-else class="constructor__question-list">
                <DomainCreateQuestionItem v-for="question in poll.questions" :order="question.order" :text="question.text" :type="question.type" />
            </ul>
            <UiMyButton class="constructor__questions-add-btn" icon="plus" :icon-with-round="true" @click="open">Add a question</UiMyButton>
        </div>
        <div class="constructor__control-btns">
            <UiMyButton @click="sendPollOnServer" btn-type="bordered" icon="add-file">Create Poll</UiMyButton>
            <UiMyButton @click="saveDraft" btn-type="bordered" icon="draft">Save draft</UiMyButton>
        </div>
    <ModalsCreateQuestionModal v-if="isOpen" :is-show-modal="isOpen" @close="close" @create="(question) => addQuestion(question)" />
    </div>
</template>

<style scoped>
.constructor {
    flex: 3 0 0;
    padding: 10px 20px;

    border-radius: 10px;
    background-color: var(--surface-alf-50);
}

.constructor__title {
    margin-bottom: 10px;
}

.constructor__input-property {
    margin-bottom: 15px;
}

.constructor__input-elem {
    width: 100%;
}

.constructor__input-elem {
    margin-top: 8px;
}

.constructor__questions {
    padding: 10px;
    border-radius: 10px;
    background: var(--surface);
}

.constructor__questions-notation {
    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
}

.constructor__question-list {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.constructor__questions-add-btn {
    justify-self: center;
}

.constructor__control-btns {
    margin-top: 20px;
    /* margin-bottom: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.constructor__question-list-zero {
    margin-top: 10px;
    margin-bottom: 15px;
    text-align: center;
    color: var(--text-secondary);
}
</style>